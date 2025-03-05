import express from 'express'
import { requireSignIn } from '../middlewares/authMiddlewares.js';
import { getUserController, updateUserController, updatePasswordController, deleteUserController } from '../controllers/userControllers.js'
// create a new router
const router = express.Router();


router.get('/details', requireSignIn, getUserController)
router.put('/update', requireSignIn, updateUserController)
router.put('/update-password', requireSignIn, updatePasswordController)
router.delete('/delete', requireSignIn, deleteUserController)

export default router