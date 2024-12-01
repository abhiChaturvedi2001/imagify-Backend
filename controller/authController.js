const User = require("../model/userMode")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(409).json({
                message: "user already exist",
                success: false
            })
        }

        const hashpassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ name, email, password: hashpassword });
        await newUser.save();

        return res.status(200).json({
            message: "Account Created Successfully",
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: "Intern server error",
            success: false
        })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "email / password is not valid",
                success: false
            })
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).json({
                message: "email / password is not valid",
                success: false
            })
        }

        const token = await jwt.sign({ _id: user?._id }, "sdfghj2345678", {
            expiresIn: "1d"
        })

        return res.status(200).cookie("token", token).json({
            message: "logged in successfully",
            success: true,
            user,
            token
        })

    } catch (error) {
        return res.status(500).json({
            message: error,
            success: false
        })
    }
}

const logout = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(0),
        });

        return res.status(200).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

module.exports = { RegisterUser, Login, logout }