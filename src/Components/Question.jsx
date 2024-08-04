import React from 'react'

const Question = ({question, answers, onAnswer}) => {
  return (
    <div className="question-container">
      <p className="question-text" dangerouslySetInnerHTML={{ __html: question }}></p> {/* Render HTML entities */}
      {answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => onAnswer(answer)}
        >
          {answer}
        </button>
      ))}
    </div>
  )
}

export default Question