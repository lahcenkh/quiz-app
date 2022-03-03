import React from "react";

function Home(props) {
    return(
        <div className="home">
            <h1>Quiz Game</h1>
            <p>let's play quiz game</p>
            <button onClick={props.handleCkick}> Start quiz</button>
        </div>
    )
}

export default Home