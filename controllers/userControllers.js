import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'

// For explicitly getting user details
export const getUserController = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = JWT.verify(token, process.env.JWT_SECRET)
        const id = decoded._id;
        const existingUser = await userModel.findById(id)
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }

        res.status(200).send({
            success: true,
            message: 'User Retrieved Successfully',
            user: {
                name: existingUser.name,
                age: existingUser.age,
                date_of_birth: existingUser.date_of_birth,
                gender: existingUser.gender,
                about: existingUser.about
            },
            token: req.headers.authorization,
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            error: error,
            message: "Error in getting user"
        })
    }
}


export const updateUserController = async (req, res) => {
    try {

        const token = req.headers.authorization;
        const decoded = JWT.verify(token, process.env.JWT_SECRET)
        const id = decoded._id;
        const formData = await req.body;

        const existingUser = await userModel.findById(id);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        if (formData.name && formData.name !== existingUser.name) {
            const userWithUpdatedName = await userModel.findOne({ name: formData.name });
            if (userWithUpdatedName) {
                return res.status(400).send({
                    success: false,
                    message: 'Username is already taken'
                });
            }
        }

        const updatedData = { ...existingUser.toObject(), ...formData };

        const updatedUser = await userModel.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).send({
            success: true,
            message: 'User Updated Successfully',
            user: updatedUser,
            token: req.headers.authorization,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            error: error,
            message: "Error in updating user"
        });
    }
}

export const updatePasswordController = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const id = decoded._id;
        const { currentPassword, newPassword } = req.body;
        console.log("currentPassword", currentPassword, newPassword)

        const existingUser = await userModel.findById(id);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        const hashedPassword = await hashPassword(currentPassword);
        const isMatch = await comparePassword(currentPassword, existingUser.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        existingUser.password = await hashPassword(newPassword);
        await existingUser.save();

        res.status(200).send({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.log("error", error)
        res.status(500).send({
            success: false,
            error: error,
            message: "Error in updating password"
        });
    }
}


export const deleteUserController = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const id = decoded._id;

        const existingUser = await userModel.findById(id);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        await userModel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: 'User account deleted successfully'
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            error: error,
            message: "Error in deleting user account"
        });
    }
}