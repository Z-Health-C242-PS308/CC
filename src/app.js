const express = require('express')
require("dotenv").config();


const journalRoute = require('./routes/journalRoutes')
const userRoute = require('./routes/userRoutes')

const app = express()
const port = 8080
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((error, req, res, next) => {
//   res.status(400).json({
//     message: error.message,
//   });
// });

app.use(
  cors({
    method: ["GET", "POST", "PUT", "DELETE"],
    origin: "*",
  })
);

// const upload = multer();

app.use('/journal', journalRoute)
app.use('/', userRoute);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})