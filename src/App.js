import { useState, useEffect } from 'react'
import './App.css';
import FirstPage from './components/FirstPage'
import Quiz from './components/Quiz'
import shuffleArray from './shuffleFuntion'
import decodeHtml from './decodeHTML'
import { nanoid } from 'nanoid'

function App() {
  const [startQuiz, setStartQuiz] = useState(true);
  const [quizData, setQuizData] = useState({});
  const [newQuiz, setNewQuiz] = useState(false);
  const [checkedAnswers, setCheckedAnswers] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => {
        const quiz = data.results.map(question => {
          let answersArray = [];
          answersArray.push(question.correct_answer);
          answersArray.push(...question.incorrect_answers);
          shuffleArray(answersArray);
          answersArray = answersArray.map(answer => {
            return {
              id: nanoid(),
              answer: decodeHtml(answer),
              isCorrect: answer === question.correct_answer ? true : false,
              isSelected: false,
            }
          })
          return {
            question: decodeHtml(question.question),
            answers: answersArray,
            id: nanoid()
          }
        })
        setQuizData(quiz)
      })
  }, [newQuiz])

  function selectAnswer(questionID, answerID) {
    setQuizData(prevData => {
      return prevData.map(question => {
        if (question.id === questionID) {
          return {
            ...question,
            answers: question.answers.map(answer => {
              if (answer.id === answerID) {
                return {
                  ...answer,
                  isSelected: true
                }
              }
              return {
                ...answer,
                isSelected: false
              }
            })
          }
        }
        return question
      })
    })
  }

  function checkAnswers() {
    setCorrectAnswers(0);
    quizData.forEach(question => {
      question.answers.forEach(answer => {
        if (answer.isSelected && answer.isCorrect) {
          setCorrectAnswers(prev => prev + 1);
        }
      })
    })
  }

  function startNewQuiz() {
    setCheckedAnswers(false);
    setQuizData(prevData => {
      return prevData.map(question => {
        return {
          ...question,
          answers: question.answers.map(answer => {
            return {
              ...answer,
              isSelected: false
            }
          })
        }
      })
    })
    setNewQuiz(prev => !prev)
  }

  return (
    <div className="App">
      {startQuiz ?
        <FirstPage
          setStartQuiz={setStartQuiz}
        /> :
        <Quiz
          quizData={quizData}
          newQuiz={newQuiz}
          startNewQuiz={startNewQuiz}
          selectAnswer={selectAnswer}
          checkAnswers={checkAnswers}
          numCorrectAnswers={correctAnswers}
          checkedAnswers={checkedAnswers}
          setCheckedAnswers={setCheckedAnswers}
        />
      }
    </div>
  );
}

export default App;
