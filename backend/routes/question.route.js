import express from 'express'
import { auth } from '../middleware/authMiddleware.js'
import { askQuestion } from '../controllers/question.controller.js'
import { checkRole } from '../middleware/checkRole.js'

const router = express.Router()

router.post('/question', auth, checkRole(['user', 'admin']), askQuestion)


export default router;
