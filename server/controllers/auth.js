import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config()

export const signup = async (req, res) => {
    console.log("Signup Hit");
    try {
        // validation
        const { username, password } = req.body;
        console.log('hghghg', username, password)
        if (!username) {
            return res.json({
                error: "Username is required",
            });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: "Password is required and should be 6 characters long",
            });
        }
        if (username === null || username.trim() === "") {
            return res.json({
                error: "Username cannot be null or empty",
            });
        }
        const exist = await User.findOne({ username });
        if (exist) {
            return res.json({
                error: "Username is taken",
            });
        }
        // hash password
        const hashedPassword = await hashPassword(password);
        try {
            const user = await new User({
                username,
                password: hashedPassword,
            }).save();
            // create signed token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            const { password, ...rest } = user._doc;
            return res.json({
                token,
                user: rest,
            });
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
};
export const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        // check if our db has user with that username
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({
                error: "No user found",
            });
        }
        // check password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({
                error: "Wrong password",
            });
        }
        // create signed token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        user.password = undefined;
        user.secret = undefined;
        res.json({
            token,
            user,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try again.");
    }
};