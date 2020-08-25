import React from "react"

import "../App.css";
import "../stylesheets/Results.css";


function Results(props) {
    const { quizResults } = props;
    return (
    <div>Results Page {quizResults.numCorrect} / {quizResults.numTotalQuestions}</div>
    );
}

export default Results;
