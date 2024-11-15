const jwt = require('jsonwebtoken');
require('dotenv').config()

function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.JWT_KEY, { expiresIn: "1day" });
}

const verifyToken = (req, res, next) => {
    const JWT_KEY = process.env.JWT_KEY;
  
    const header = req.headers;
    const Istoken = header && header.authorization && header.authorization.split(' ')[0] === 'Bearer';

// console.log(header)
//     console.log(Istoken)
  
    if (!Istoken) {
      return res.status(400).json({
        error: true,
        message: 'Cari token dulu',
      });
    }
  
    const token = header.authorization.split(' ')[1];
  
    jwt.verify(token, JWT_KEY, (error, decoded) => {
      if (error) {
        return res.status(403).json({
          error: true,
          message: error.message,
        });
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  };

  // const verifyToken = (req, res, next) => {
//     const JWT_KEY = process.env.JWT_KEY;
//     try {
//         const header = req.headers
//         const Istoken = header && header.authorization && header.authorization.split(' ')[0] == 'Bearer';
//         const token = header.authorization.split(' ')[1]


//         if (Istoken && header.authorization !== undefined) {
//             jwt.verify(token, JWT_KEY, (error, decoded) => {
//                 if (error) {
//                     res.status(403).json({
//                         error: true,
//                         message: error.message,
//                     })

//                 } else {
//                     res.locals.jwt = decoded
//                     next();
//                 }
//             })
//         } else {
//             res.status(400).json({
//                 error: true,
//                 message: 'Cari token dulu',
//             })
//         }
//     } catch (error) {
//         res.status(401).json({
//             error: true,
//             message: 'Anda belum login!',
//         })
//     }
// }

// const verifyToken = (req, res, next) => {
//   const JWT_KEY = process.env.JWT_KEY;

//     const header = req.headers
//     const Istoken = header && header.authorization && header.authorization.split(' ')[0] == 'Bearer';
//     const token = header.authorization.split(' ')[1]

//     if (Istoken) {
//         jwt.verify(token, JWT_KEY, (error, decoded) => {
//             if (error) {
//                 res.status(403).json({
//                     error: true,
//                     message: error.message,
//                 })

//             } else {
//                 res.locals.jwt = decoded
//                 next();
//             }
//         })
//     } else {
//         res.status(400).json({
//             error: true,
//             message: 'Cari token dulu',
//         })
//     }
// }
  

module.exports = { generateAccessToken, verifyToken };