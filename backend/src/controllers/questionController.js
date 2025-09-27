import Question from '../models/questionModel.js';
import Classroom from '../models/classroomModel.js';

// Get questions for a specific classroom (TEACHER ONLY)
export const getQuestionsForClass = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.classId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    if (req.user._id.toString() !== classroom.teacher.toString()) {
      return res.status(403).json({ message: 'Not authorized to view these questions' });
    }

    // ADDED: Filter logic
    const filter = req.query.status ? { status: req.query.status } : {};
    const classroomFilter = { classroom: req.params.classId };

    const questions = await Question.find({ ...filter, ...classroomFilter })
      .populate('author', 'name')
      .sort({ createdAt: 'desc' });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// NEW: Function to clear all questions for a specific class
export const clearQuestionsForClass = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.classId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    if (req.user._id.toString() !== classroom.teacher.toString()) {
      return res.status(403).json({ message: 'Not authorized to clear questions' });
    }

    await Question.deleteMany({ classroom: req.params.classId });
    res.json({ message: 'All questions for this class have been cleared.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- (createQuestion and updateQuestionStatus functions remain unchanged) ---

export const createQuestion = async (req, res) => {
  const { text } = req.body;
  const question = new Question({ text, author: req.user._id, classroom: req.params.classId });
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