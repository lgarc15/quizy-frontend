import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import { Accordion, Card } from "react-bootstrap";

import "../App.css";
import "../stylesheets/Results.css";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };

    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

  render() {
    const { quizResults, questions } = this.props;
    const { expanded } = this.state;
    console.log(expanded);

    return (
      <div id="result">
        <h1>
          Quiz Results: {quizResults.numCorrect} /{" "}
          {quizResults.numTotalQuestions}
        </h1>
        <div id="result-info-container">
          <div id="result-info">
            {questions.map((question, index) => (
              <Accordion className={`result-item ${question.user_answer_data.user_correct ? "result_item_correct" : "result_item_incorrect"}`} key={index}>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey={question.id}>
                    <div className="result-item-overview">
                      <p className="result-question">
                        {question.id}. {question.question}{" "}
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
                      {/* <p>{question.correct_answer}</p> */}
                      {/* <p>{question.user_answer_data.user_correct}</p> */}
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
