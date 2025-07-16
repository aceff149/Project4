import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QandA = () => {
  const [qaData, setQaData] = useState([]);
  const [error, setError] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [answers, setAnswers] = useState({}); // To store answers for each question

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/questions');
        setQaData(response.data);
      } catch (error) {
        setError('Could not fetch questions: ' + error.message);
      }
    };

    fetchQuestions();
  }, []);

  const fetchAnswers = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/answers/${questionId}`);
      setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: response.data }));
    } catch (error) {
      setError('Could not fetch answers: ' + error.message);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!selectedQuestionId) {
      setError('Please select a question to answer.');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:3000/api/answers',
        { answer_text: answerText, question_id: selectedQuestionId },
        { headers: { 'x-access-token': token } }
      );

      // Refresh answers for the selected question after submission
      fetchAnswers(selectedQuestionId);

      setAnswerText('');
      setSelectedQuestionId(null);
    } catch (error) {
      setError('Error submitting answer: ' + (error.response?.data || error.message));
    }
  };

  const handleDeleteAnswer = async (answerId, questionId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/answers/${answerId}`, {
        headers: { 'x-access-token': token }
      });
      fetchAnswers(questionId); // Refresh answers after deletion
    } catch (error) {
      setError('Error deleting answer: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="qanda">
      <h1>Q&A</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div className="qa-list">
        {qaData.length > 0 ? (
          qaData.map((item) => (
            <div key={item.id} className="qa-item">
              <div
                className="question"
                onClick={() => {
                  setSelectedQuestionId(item.id);
                  fetchAnswers(item.id); // Fetch answers when question is selected
                }}
                style={{ cursor: 'pointer', fontWeight: selectedQuestionId === item.id ? 'bold' : 'normal' }}
              >
                {item.questions_text}
              </div>
              {answers[item.id] && answers[item.id].map((answer) => (
                <div key={answer.id} className="answer">
                  <strong>{answer.username}</strong>: {/* Display username */}
                  <span>{answer.answer_text}</span>
                  <button onClick={() => handleDeleteAnswer(answer.id, item.id)}>Delete</button>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
      {selectedQuestionId && (
        <form onSubmit={handleAnswerSubmit}>
          <input
            type="text"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Type your answer..."
            required
          />
          <button type="submit">Submit Answer</button>
        </form>
      )}
    </div>
  );
};

export default QandA;