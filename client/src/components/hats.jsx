import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QandA = () => {
  const [qaData, setQaData] = useState([]);
  const [error, setError] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [loadingAnswers, setLoadingAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/questions');
        setQaData(response.data);
      } catch (error) {
        setError('Could not fetch questions: ' + error.message);
      } finally {
        setLoadingQuestions(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const fetchAnswers = async (questionId) => {
    if (answers[questionId]) return; // Avoid re-fetching if already loaded

    setLoadingAnswers((prev) => ({ ...prev, [questionId]: true }));
    try {
      const response = await axios.get(`http://localhost:3000/api/answers/${questionId}`);
      setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: response.data }));
    } catch (error) {
      setError('Could not fetch answers: ' + error.message);
    } finally {
      setLoadingAnswers((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  const handleQuestionClick = (questionId) => {
    if (selectedQuestionId === questionId) {
      setSelectedQuestionId(null); // Toggle off
    } else {
      setSelectedQuestionId(questionId);
      fetchAnswers(questionId);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    if (!answerText.trim()) {
      setError('Answer text cannot be empty.');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:3000/api/answers',
        { answer_text: answerText, question_id: selectedQuestionId },
        { headers: { 'x-access-token': token } }
      );

      setAnswerText('');
      // Refresh answers for this question
      await fetchAnswers(selectedQuestionId);
    } catch (error) {
      setError('Error submitting answer: ' + (error.response?.data || error.message));
    }
  };

  const handleDeleteAnswer = async (answerId, questionId) => {
    const confirmed = window.confirm('Are you sure you want to delete this answer?');
    if (!confirmed) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/api/answers/${answerId}`, {
        headers: { 'x-access-token': token },
      });

      // Refresh answers
      const response = await axios.get(`http://localhost:3000/api/answers/${questionId}`);
      setAnswers((prev) => ({ ...prev, [questionId]: response.data }));
    } catch (error) {
      setError('Error deleting answer: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="qanda" style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h1>Q&A</h1>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      {loadingQuestions ? (
        <p>Loading questions...</p>
      ) : qaData.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        <div className="qa-list">
          {qaData.map((item) => (
            <div key={item.id} className="qa-item" style={{ marginBottom: '1rem' }}>
              <div
                className="question"
                onClick={() => handleQuestionClick(item.id)}
                style={{
                  cursor: 'pointer',
                  fontWeight: selectedQuestionId === item.id ? 'bold' : 'normal',
                  padding: '5px 0',
                }}
              >
                {item.questions_text}
              </div>

              {selectedQuestionId === item.id && (
                <>
                  {loadingAnswers[item.id] ? (
                    <p>Loading answers...</p>
                  ) : (
                    <div className="answers" style={{ paddingLeft: '1rem' }}>
                      {answers[item.id] && answers[item.id].length > 0 ? (
                        answers[item.id].map((answer) => (
                          <div key={answer.id} className="answer" style={{ marginTop: '5px' }}>
                            <strong>{answer.username}:</strong>{' '}
                            <span>{answer.answer_text}</span>
                            <button
                              onClick={() => handleDeleteAnswer(answer.id, item.id)}
                              style={{
                                marginLeft: '10px',
                                background: 'red',
                                color: 'white',
                                border: 'none',
                                padding: '2px 5px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        ))
                      ) : (
                        <p>No answers yet.</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedQuestionId && (
        <form onSubmit={handleAnswerSubmit} style={{ marginTop: '1rem' }}>
          <input
            type="text"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Type your answer..."
            required
            style={{ width: '80%', padding: '5px' }}
          />
          <button type="submit" style={{ marginLeft: '10px', padding: '5px 10px' }}>
            Submit Answer
          </button>
        </form>
      )}
    </div>
  );
};

export default QandA;
