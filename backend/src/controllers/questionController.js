import Question from '../models/questionModel.js';
import Classroom from '../models/classroomModel.js';

export const getQuestionsForClass = async (req, res) => {
  const questions = await Question.find({ classroom: req.params.classId }).populate('author', 'name').sort({ createdAt: 'desc' });
  res.json(questions);
};

export const createQuestion = async (req, res) => {
  const { text } = req.body;
  const question = new Question({
    text,
    author: req.user._id,
    classroom: req.params.classId,
  });
  const createdQuestion = await question.save();
  res.status(201).json(createdQuestion);
};

export const updateQuestionStatus = async (req, res) => {
  const { status } = req.body;
  const question = await Question.findById(req.params.questionId);
  const classroom = await Classroom.findById(question.classroom);

  if (req.user._id.toString() !== classroom.teacher.toString()) {
    return res.status(401).json({ message: 'Only the teacher can update status' });
  }

  if (question) {
    question.status = status;
    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } else {
    res.status(404).json({ message: 'Question not found' });
  }
};