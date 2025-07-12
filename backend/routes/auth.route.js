import express from 'express'
import { signup, login } from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', verifyToken, login)

export default router;
