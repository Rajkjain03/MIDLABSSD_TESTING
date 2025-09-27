import express from 'express';
import { getQuestionsForClass, createQuestion, updateQuestionStatus } from '../controllers/questionController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/:classId').get(protect, getQuestionsForClass).post(protect, createQuestion);
router.route('/:questionId/status').patch(protect, updateQuestionStatus);
export default router;