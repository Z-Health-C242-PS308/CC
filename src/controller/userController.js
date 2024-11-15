const crypto = require('crypto');
const bcrypt = require('bcrypt');
require('dotenv').config()

const { generateAccessToken } = require('../middleware/authToken');
const { inputUser, getUsers } = require('../model/userModel')

const registerController = async (req, res) => {
    const { username, password, confirmPass, nama_lengkap, email, no_hp} = req.body;
    const profile_img = req.file.cloudStoragePublicUrl;
    const user_id = crypto.randomUUID();

    if (password !== confirmPass) {
        return res.status(400).json({
            error: true,
            message: 'Password tidak cocok!'
        });
    }
    // console.log(profile_img);
    // console.log(password);

    let hashedPass = await bcrypt.hashSync(password, 10);
    const newUser = {
        user_id: user_id,
        username: username,
        nama_lengkap: nama_lengkap,
        email: email,
        password: hashedPass,
        no_hp: no_hp,
        profile_img: profile_img
    }
    try {
        await inputUser(user_id, newUser);

        return res.status(200).json({
            error: false,
            message: 'Berhasil, Silahkan login!',
            user: newUser
        })

    } catch (e) {
        return res.status(500).json({
            error: true,
            message: e.message,
        });
    }
}


const loginController = async (req, res) => {
    const { username, password } = req.body

    const userSnapshot = await getUsers(username);
    if (userSnapshot.empty) {
        return res.status(400).json({
            error: true,
            message: 'User tidak ada, please register!'
        })
        return false;
    }

    let userRef;
    userSnapshot.forEach(user => {
        userRef = user.data()
    })
    const isValid = bcrypt.compareSync(password, userRef.password);

    if (!isValid) {
        return res.status(404).json({
            error: true,
            message: 'Password Salah!'
        })
    }

    userRef.token = generateAccessToken(username);

    return res.status(200).json({
        error: false,
        message: 'Login Berhasil !',
        user: userRef
    })
}

const onLoginController = (req, res) => {
    const data = res.locals.jwt;

    res.status(200).json({
        error: false,
        message: data
    });
}

module.exports = { registerController, loginController, onLoginController }