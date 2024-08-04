import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Question from './Question';
import Result from './Result';
import './Quiz.css';

const Quiz = () => {

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0); 
  const [wrongAnswers, setWrongAnswers] = useState(0); 
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [timer, setTimer] = useState(60); 
  const [isQuizOver, setIsQuizOver] = useState(false);

  useEffect(() => {
    // Load quiz state from localStorage
    const savedState = JSON.parse(localStorage.getItem('quizState'));
    if (savedState) {
      setQuestions(savedState.questions);
      setCurrentQuestionIndex(savedState.currentQuestionIndex);
      setCorrectAnswers(savedState.correctAnswers);
      setWrongAnswers(savedState.wrongAnswers);
      setAnsweredQuestions(savedState.answeredQuestions);
      setTimer(savedState.timer);
      setIsQuizOver(savedState.isQuizOver);
    } else {
      // Fetch questions from the API
      axios.get('https://opentdb.com/api.php?amount=10&category=11&difficulty=easy')
        .then(response => {
          setQuestions(response.data.results);
        })
        .catch(error => {
          console.error('Error fetching quiz data:', error);
        });
    }

    // Timer countdown
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsQuizOver(true); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  const handleAnswer = (selectedAnswer) => {
    const question = questions[currentQuestionIndex];
    if (selectedAnswer === question.correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
    setAnsweredQuestions(answeredQuestions + 1);
    if (answeredQuestions + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizOver(true);
    }

    // save quiz state to localStorage
    localStorage.setItem('quizState', JSON.stringify({
      questions,
      currentQuestionIndex,
      correctAnswers,
      wrongAnswers,
      answeredQuestions,
      timer,
      isQuizOver
    }));
  };

  const handleRestart = () => {
    localStorage.removeItem('quizState');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setAnsweredQuestions(0);
    setTimer(60);
    setIsQuizOver(false);
  };

  if (isQuizOver) {
    const score = correctAnswers * 10; 
    return (
      <Result
        score={score}
        totalQuestions={questions.length}
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        answeredQuestions={answeredQuestions}
        onRestart={handleRestart}
      />
    );
  }

  if (questions.length === 0) return <div>Loading...</div>;

  const question = questions[currentQuestionIndex];
  const answers = [...question.incorrect_answers, question.correct_answer];

  return (

    <div className="quiz-container">
      <h1>Quiz</h1>
      <p>Time Left: {timer} seconds</p>
      <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
      <Question
        question={question.question}
        answers={answers}
        onAnswer={(selectedAnswer) => handleAnswer(selectedAnswer)}
      />
    </div>
  )
}

export default Quiz