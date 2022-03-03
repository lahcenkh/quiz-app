import React from "react";

function Question(props) {
    const answer = props.answers
    return(
        <div  className="question">
            <h4>{props.question}</h4>
            <ul onClick={props.testOver}>
            {
                answer !== undefined && 
                answer.map(answer => (<li className={answer.isClicked ? "cliked--true" : "cliked--false"} onClick={() => props.handleClick(answer.id)}  key={answer.id}>{answer.answer}</li>) )
            }
            </ul>
        </div>
    )
}

export default Question