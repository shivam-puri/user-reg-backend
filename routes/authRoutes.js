import express from 'express'
import { registerController, loginController } from '../controllers/authControllers.js'
import { requireSignIn } from '../middlewares/authMiddlewares.js';


const router = express.Router();


router.post('/register', registerController)
router.post('/login', loginController)
router.get('/verification', requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true
    })
})

export default router