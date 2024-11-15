const crypto = require('crypto');
const bcrypt = require('bcrypt');
require('dotenv').config()

const { generateAccessToken } = require('../middleware/authToken');
const { inputUser } = require('../model/userModel')

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


module.exports = { registerController }