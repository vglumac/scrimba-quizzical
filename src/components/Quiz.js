import { useState } from 'react'

export default function Quiz(props) {
    const [inputs, setInputs] = useState({})

    function handleChange(event, questionID, answerID) {
        if (!props.checkedAnswers) {
            setInputs(prev => {
                return {
                    ...prev,
                    [event.target.name]: event.target.value
                }
            })
            props.selectAnswer(questionID, answerID);
        }
    }

    function handleClick() {
        props.checkAnswers();
        props.setCheckedAnswers(true);
    }

    const styles = (answer) => {
        return {
            backgroundColor: props.checkedAnswers ? answer.isCorrect ? '#94D7A2' : answer.isSelected ? '#F8BCBC' : 'transparent' : answer.isSelected ? '#D6DBF5' : 'transparent',
            border: answer.isSelected ? 'none' : props.checkedAnswers ? answer.isCorrect ? 'none' : '' : '',
            opacity: props.checkedAnswers ? answer.isCorrect ? '1' : '0.5' : '1'
        }
    }

    return (
        <div className='quiz'>
            {props.quizData.map(question => {
                return (
                    <fieldset key={question.id} className='question'>
                        <legend className='questionText'>{question.question}</legend>
                        {question.answers.map(answer => {
                            return (
                                <div key={answer.id} className='answers'>
                                    <input
                                        type='radio'
                                        value={answer.answer}
                                        checked={inputs ? answer.answer === inputs[question.id] : false}
                                        id={answer.id}
                                        name={question.id}
                                        onChange={(event) => handleChange(event, question.id, answer.id)}
                                    />
                                    <label
                                        htmlFor={answer.id}
                                        className='answer'
                                        // style={{
                                        //     backgroundColor: props.checkedAnswers ? answer.isCorrect ? '#94D7A2' : answer.isSelected ? '#F8BCBC' : 'transparent' : answer.isSelected ? '#D6DBF5' : 'transparent',
                                        //     border: answer.isSelected ? 'none' : props.checkedAnswers ? answer.isCorrect ? 'none' : '' : '',
                                        //     opacity: props.checkedAnswers ? answer.isCorrect ? '1' : '0.5' : '1'
                                        // }}
                                        style={styles(answer)}
                                    >
                                        {answer.answer}
                                    </label>
                                </div>
                            )
                        })}
                    </fieldset>
                )
            })}
            {props.checkedAnswers && <div className='checkedMessage'>
                <p>You scored {props.numCorrectAnswers}/5 correct answers</p>
                <button className='button' onClick={props.startNewQuiz}>Play Again</button>
            </div>}
            {!props.checkedAnswers && <button className='button' onClick={handleClick}>Check answers</button>}
        </div>
    )
}