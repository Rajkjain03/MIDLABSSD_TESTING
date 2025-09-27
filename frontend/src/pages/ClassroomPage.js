import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectCurrentUser } from '../features/authSlice';
import QuestionForm from '../components/QuestionForm';
import QuestionCard from '../components/QuestionCard';

const ClassroomPage = () => {
  const { classId } = useParams();
  const user = useSelector(selectCurrentUser);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  const fetchQuestions = useCallback(async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`http://localhost:5000/api/questions/${classId}`, config);
      setQuestions(data);
    } catch (err) {
      setError('Failed to fetch questions.');
    }
  }, [classId, user.token]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleQuestionSubmit = async (text) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`http://localhost:5000/api/questions/${classId}`, { text }, config);
      fetchQuestions();
    } catch (err) {
      alert('Failed to post question.');
    }
  };

  const handleStatusChange = async (questionId, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.patch(`http://localhost:5000/api/questions/${questionId}/status`, { status }, config);
      fetchQuestions();
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  return (
    <div className="classroom">
      {error && <p className="error-message">{error}</p>}
      <h2>Classroom Q&A</h2>
      {user.role === 'student' && <QuestionForm onSubmit={handleQuestionSubmit} />}
      <div className="question-board">
        {questions.map((q) => (
          <QuestionCard
            key={q._id}
            question={q}
            user={user}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassroomPage;