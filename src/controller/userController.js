const crypto = require('crypto');
const bcrypt = require('bcrypt');
require('dotenv').config()

const { generateAccessToken } = require('../middleware/authToken');
const { inputUser, getUsers, updateProfil, getUserbyid } = require('../model/userModel')
const { encrypt, decrypt } = require('../utils/crypt')

const registerCtrl = async (req, res) => {
    const { username, password, confirmPass, nama_lengkap, email, no_hp} = req.body;
    const profile_img = req.file.cloudStoragePublicUrl;
    const user_id = crypto.randomUUID();

    if (password !== confirmPass) {
        return res.status(400).json({
            error: true,
            message: 'Password tidak cocok!'
        });
    }

    // let hashedPass = await bcrypt.hashSync(password, 10);
    const encryptedPassword = encrypt(password);
    const newUser = {
        user_id: user_id,
        username: username,
        nama_lengkap: nama_lengkap,
        email: email,
        password: 
        // hashedPass,
        encryptedPassword,
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


const loginCtrl = async (req, res) => {
    const { username, password } = req.body

    const userSnapshot = await getUsers(username);

    // console.log(userSnapshot)

    // console.log("cek", userSnapshot.password)

   
    
    // console.log(checkPassword)
    if (userSnapshot.empty) {
        return res.status(400).json({
            error: true,
            message: 'User tidak ada, please register!'
        })
    }

    // let userRef;
    // userSnapshot.forEach(user => {
    //     userRef = user.data()
    // })
    // const isValid = bcrypt.compareSync(password, userRef.password);

    const checkPassword = decrypt(userSnapshot.password)

    if (password !== checkPassword) {
        return res.status(404).json({
            error: true,
            message: 'Password Salah!'
        })
    }

    userSnapshot.token = generateAccessToken(username);

    return res.status(200).json({
        error: false,
        message: 'Login Berhasil !',
        user: userSnapshot
    })
}

const onLoginCtrl = (req, res) => {
    const data = res.locals.jwt;

    res.status(200).json({
        error: false,
        message: data
    });
}

const updateProfilCtrl = async (req, res) => {
    const user_id = req.params.id
    const ava = req.file.cloudStoragePublicUrl
    const { username, nama_lengkap, email, password, no_hp } = req.body;
    // console.log(req.headers)
    console.log(ava)

    try {
        const user = await getUserbyid(user_id);

        console.log(user.password)

        // const decryptedPassword = decrypt(user.password);

        const data = {
            user_id: user_id,
            username: username || user.username,
            nama_lengkap: nama_lengkap || user.nama_lengkap,
            email: email || user.email,
            password: password || 
            user.password,
            // decryptedPassword,
            no_hp: no_hp || user.no_hp,
            profile_img: ava || user.profile_img
        }

        if (password) {
            const encryptedPassword = encrypt(data.password);
            data.password = encryptedPassword; 
        }

        await updateProfil(user_id, data)

        res.status(200).json({
            error: false,
            message: 'Data anda berhasil diubah',
            user: data
        });

    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        });
    }
}

const getUserbyidCtrl = async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    try {
        const user = await getUserbyid(id);
        
        const decryptedPass = decrypt(user.password)

        const data = {
            user_id: user.user_id,
            username: user.username,
            nama_lengkap: user.nama_lengkap,
            email: user.email,
            password: 
            // user.password,
            decryptedPass,
            no_hp: user.no_hp,
            profile_img: user.profile_img
        }

        return res.status(200).json({
            message: 'Berhasil mengambil data user!',
            user_detail: data
        });
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
}

module.exports = { registerCtrl, loginCtrl, onLoginCtrl, updateProfilCtrl, getUserbyidCtrl }