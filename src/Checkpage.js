import React from "react"

function CheckPage(props) {
    const answer = props.answers
    
    return(
        <div  className="question">
            <h4>{props.question}</h4>
            <ul>
            {
                answer !== undefined && 
                answer.map(answer => (<li  
                    className={answer.isClicked && answer.answer === props.correct_answer ? "style_correct" : 
                        answer.isClicked && answer.answer !== props.correct_answer ? "style_incorrect" : 
                        answer.answer === props.correct_answer ? "style_correct" : "style_others"}  
                    key={answer.id}>{answer.answer}</li>) )
            }
            </ul>
        </div>
    )
}

export default CheckPage