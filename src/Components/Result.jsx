import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Result.css';

const Result = ({score, totalQuestions, correctAnswers, wrongAnswers, answeredQuestions, onRestart}) => {
  const navigate = useNavigate();
  const handleRestart = () => {
    if (onRestart) onRestart();
    navigate('/'); 
  };

  return (
    <div className="result-container">
      <h1>Quiz Over!</h1>
      <p>Score:</p>
      <div className='answers-score'>{score}</div>
      <p>Total Answered Questions: {answeredQuestions}</p>
      <div className="answers-container">
        <div className="answer-section">
          <p>Correct Answers</p>
          <div className="answers-correct">{correctAnswers}</div>
        </div>
        <div className="answer-section">
          <p>Wrong Answers</p>
          <div className="answers-wrong">{wrongAnswers}</div>
        </div>
      </div>
      <button onClick={handleRestart}>Restart Quiz</button>
    </div>
  );
}

export default Result