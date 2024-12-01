const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors");
const connectDb = require("./DB/db")
const authRouter = require("./routes/authRoutes")

// middleware
const app = express();
dotenv.config({})
const options = {
    origin: "https://imagify-vert-eight.vercel.app",
    credentials: true
}

app.use(express.json());
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
