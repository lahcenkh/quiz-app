import React, { useState } from "react"
import QuizPage from "./Quizpage"
import "./style.css"
import Home from "./Startpage"

function App() {

    const [start, setStart] = useState(false)


    return !start ? <Home handleCkick={() => setStart(true)}/> : <QuizPage/>
}

export default App