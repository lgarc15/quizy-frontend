import React from "react";
import { Switch, Route } from "react-router-dom";

import "../App.css";
import "../stylesheets/Content.css";
import StartQuiz from "./StartQuiz";
import Question from "./Question";

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsToAsk: null, // Array[Object]
      questionsAnswered: null, // Array[Object]
      currentQuestion: null,
    };

    this.startQuiz = this.startQuiz.bind(this);
    this.handleUserAnswer = this.handleUserAnswer.bind(this);
    this.moveToNextQuestion = this.moveToNextQuestion.bind(this);
    this.endQuiz = this.endQuiz.bind(this);
  }

  startQuiz(quizQuestions) {
    // Attach and ID to the questions.
    quizQuestions.map((item, index) => (item["id"] = index + 1));
    this.setState({
      questionsToAsk: quizQuestions,
      questionsAnswered: [],
      currentQuestion: quizQuestions[0]
    });
  }

  // Function to allow the child to notify when to move on to the next question.
  moveToNextQuestion() {
    const { currentQuestion } = this.state;
    console.log("moveToNextQuestion");
    console.log(currentQuestion);
  }

  handleUserAnswer(userAnswer, questionId) {
    const { questionsToAsk } = this.state;
    const questionToAnswer = questionsToAsk.filter(function (question) {
      return question.id === questionId;
    })[0];

    // The response must be handled in Question component
    // (i.e. animation to display whether the answer was correct or not).
    setTimeout(this.moveToNextQuestion, 3000);

    // Send whether the answer is correct and also the correct answer, in case it is wrong.
    return [
      questionToAnswer.correct_answer === userAnswer,
      questionToAnswer.correct_answer,
    ];
  }

  endQuiz() {
    console.log("Content: endQuiz");
  }

  render() {
    return (
      <div className="bg-cl-1" id="content">
        <Switch>
          <Route exact path="/">
            <StartQuiz
              questionsToAsk={this.state.questionsToAsk}
              questionsAnswered={this.state.questionsAnswered}
              currentQuestion={this.state.currentQuestion}
              startQuiz={this.startQuiz}
            />
          </Route>
          <Route path="/question/:id">
            <Question handleUserAnswer={this.handleUserAnswer} />
          </Route>
          <Route>Route not found</Route>
          {/* <Route path="/"></Route> */}
        </Switch>
      </div>
    );
  }
}
