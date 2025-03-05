import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from 'jsonwebtoken';


export const registerController = async (req, res) => {
    try {
        const { name, password, date_of_birth, age, gender, about } = await req.body

        if (!name) {
            return res.send({ error: 'Name is required' });
        }
        if (!password) {
            return res.send({ error: 'Password is required' });
        }
        if (!date_of_birth) {
            return res.send({ error: 'DOB is required' });
        }
        if (!age) {
            return res.send({ error: 'Age is required' });
        }
        if (!gender) {
            return res.send({ error: 'Gender is required' });
        }
        if (!about) {
            return res.send({ error: 'About is required' });
        }

        const existingUser = await userModel.findOne({ name })

        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: "User already registered, please login"
            })
        }

        const hashedPassword = await hashPassword(password);
        const user = new userModel({
            name, password: hashedPassword, date_of_birth, age, gender, about
        }).save()

        res.status(201).send({
            success: true,
            message: 'User registered successfully'
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            error: error,
            message: "Error in registration"
        })
    }
};


export const loginController = async (req, res) => {

    try {
        const { name, password } = await req.body;

        if (!name || !password) {
            return res.status(400).send({ error: 'Invalid Name or password' });
        }

        const existingUser = await userModel.findOne({ name });

        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User does not exist Please register'
            })
        }

        const match = await comparePassword(password, existingUser.password)
        if (!match) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials'
            })
        }

        const token = await JWT.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })


        res.status(200).send({
            success: true,
            message: 'Logged in successfully',
            user: {
                name: existingUser.name,
                age: existingUser.age,
                date_of_birth: existingUser.date_of_birth,
                gender: existingUser.gender,
                about: existingUser.about
            },
            token,
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in login",
            error: error.message
        })
    }
};
