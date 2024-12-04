const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors");
const connectDb = require("./DB/db")
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/authRoutes")

// middleware
const app = express();
dotenv.config({})
const options = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(express.json());
app.use(cookieParser())
app.use(cors(options));
app.use("/auth", authRouter)


const port = process.env.PORT || 8000
connectDb().then(() => {
    app.listen(port, () => {
        console.log("server is listen on", port)
    })
}).catch((error) => {
    console.log(error)
})
