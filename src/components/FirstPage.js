export default function FirstPage(props) {
    return (
        <div className='frontPage'>
            <h1>Quizzical</h1>
            <button className='button button__big' onClick={() => props.setStartQuiz(false)}>Start quiz</button>
        </div>
    )
}