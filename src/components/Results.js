import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import he from "he";

import { Accordion, Card } from "react-bootstrap";

import "../App.css";
import "../stylesheets/Results.css";

export default class Results extends React.Component {
  render() {
    const { quizResults, questions } = this.props;
    const correctPercentage = (quizResults.numCorrect / quizResults.numTotalQuestions) * 100;

    return (
      <div className="main-content" id="result">
        <h1 className="text-center" id="result-header">Quiz Results</h1>
        <div id="result-summary">
          <div>Total Questions: {quizResults.numTotalQuestions}</div>
          <div>Your Score: {correctPercentage.toFixed(0)}%</div>
          <div>Total Correct: {quizResults.numCorrect}</div>
        </div>
        <div id="result-info-container">
          <div id="result-info">
            {questions.map((question, index) => (
              <Accordion
                className={`result-item ${
                  question.user_answer_data.user_correct
                    ? "result_item_correct"
                    : "result_item_incorrect"
                }`}
                key={index}
              >
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={question.id}>
                    <div className="result-item-overview">
                      <p className="result-question">
                        {question.id}. {he.decode(question.question)}{" "}
                      </p>
                      <div
                        className="result-expand-btn-container"
                        onClick={this.handleExpandClick}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          className={"result-expand-btn"}
                        />
                      </div>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={question.id}>
                    <Card.Body>
                      <p>Possible Answers: </p>
                      <ul>
                        <li>{question.correct_answer}</li>
                        {question.incorrect_answers.map((answer, index) => (
                          <li key={index}>{answer}</li>
                        ))}
                      </ul>
                      <p>
                        Your Answer: {question.user_answer_data.user_answer}
                      </p>
                      {!question.user_answer_data.user_correct && (
                        <p>Correct Answer: {question.correct_answer}</p>
                      )}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
