import React, {useState, useEffect} from "react";
import Question from "./Question";
import {nanoid} from "nanoid"
import CheckPage from "./Checkpage";


function QuizPage() {

    const [allQuestion, setAllQuestion] = useState([{
        id: "",
        category: "",
        type: "",
        difficulty: "",
        question: "",
        correct_answer: "",
        incorrect_answers: []
    }])

    const [testIsOver, setTestIsOver] = useState(false)


    // get data from opendb api
    useEffect( () => {
        async function getQuestion() {
            const url = "https://opentdb.com/api.php?amount=4&category=15&difficulty=easy&type=multiple"
            const response = await fetch(url)
            const data = await response.json()
            
            const questions = data.results.map(q => {
                return {
                    ...q,
                    id: nanoid(),
                    answers: [...q.incorrect_answers, q.correct_answer]
                }
            })

            const questionsid = questions.map(q => {
                return {
                    ...q,
                    isOver: false,
                    answers: q.answers.map(anw => {
                        return {
                            id: nanoid(),
                            isClicked: false,
                            answer: anw
                        }
                    })
                }
            })
            setAllQuestion(questionsid)
        }
        getQuestion()
    }, [])

    // change state of question options
    function handleClick(id) {
        setAllQuestion(prevq => prevq.map(q => {
            return {
                ...q,
                answers: q.answers.map(answ => {
                    return answ.id === id ? {...answ, isClicked: !answ.isClicked} : answ
                })
            }
        }))
    }

    // change state of isOver value
    function testOver(id) {
        setAllQuestion(prev => prev.map(q => {
            return {
                ...q,
                isOver: q.id === id ? !q.isOver : q.isOver
            }
        }))
    }

    const displayQuestion = allQuestion.map(q => {
        return(
            <Question
                key={q.id} 
                testOver={() => testOver(q.id)}
                handleClick={handleClick}
                question={q.question} 
                answers={q.answers} 
                isClicked={q.answers}
                />
        )
    })

    const checkAnswers = allQuestion.map(q => {
        return(
                <CheckPage 
                key={q.id}
                question={q.question} 
                answers={q.answers}
                correct_answer={q.correct_answer}
            />
        )
    })

    
    
    return (
        <div className="quiz--page">

            {!testIsOver ?
            <>
                {displayQuestion}
                <button onClick={() => setTestIsOver(prev => !prev)}>check answers</button>
            </> :
            
            <>
                {checkAnswers}
                <div className="paly-score">
                {/* <p>your score is : </p> */}
                <button className="paly-again" onClick={() => window.location.reload()}>play again</button>
                </div>
            </>
            
            
            }

            
            
        </div>
    )
}

export default QuizPage