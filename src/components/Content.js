import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import querystring from "querystring";

import "../App.css";
import "../stylesheets/Content.css";
import StartQuiz from "./StartQuiz";
import Question from "./Question";

// Returns the question with the given id.
const findQuestionIndex = function(questionArray, questionId) {
  return questionArray.findIndex((question) => question.id === questionId)
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsToAsk: null, // Array[Object]
      questionsAnswered: null, // Array[Object]
      currentQuestion: null,
    };

    this.handleStartQuiz = this.handleStartQuiz.bind(this);
    this.handleUserAnswer = this.handleUserAnswer.bind(this);
    this.moveToNextQuestion = this.moveToNextQuestion.bind(this);
    this.endQuiz = this.endQuiz.bind(this);
  }

  // Function to allow the child to notify when to move on to the next question.
  moveToNextQuestion() {
    const { questionsToAsk, currentQuestion } = this.state;
    // Find the index of the question that was answered.
    const questionAnsweredIndex = findQuestionIndex(questionsToAsk, currentQuestion.id);
    // const questionAnsweredIndex = questionsToAsk.findIndex(
    //   (item) => item.id === currentQuestion.id
    // );
    console.log(questionAnsweredIndex);

    // TODO: Attempt to get the next question to answer.
    // If there is none, then go to the final page.
    // If there is a question, set the state and go to the next question.

    // Since the question was answered, remove it from `questionsToAsk` and add it to `questionsAnswered`.
    // this.setState({
    //   questionsAnswered: questionsToAsk.splice(questionAnsweredIndex, 1)
    // });
  }

  handleStartQuiz(queryStringsObj) {
    axios
      .get(
        `https://opentdb.com/api.php?${querystring.stringify(queryStringsObj)}`
      )
      .then((response) => {
        const questionsData = response.data.results;

        // Attach and ID to the questions (ID starting with 1).
        questionsData.map((item, index) => (
          item["id"] = index + 1
        ));

        // Find the first question's index.
        const firstQuestionIndex = findQuestionIndex(questionsData, 1);
        const currentQuestion = questionsData[firstQuestionIndex];
        
        // Save the state of the quiz game.
        this.setState({
          questionsToAsk: questionsData,
          questionsAnswered: [],
          currentQuestion: currentQuestion,
        });

        this.props.history.push({
          pathname: `question/${currentQuestion.id}`,
          state: {
            questionMeta: currentQuestion,
            totalNumQuestions: questionsData.length,
          },
        });
      })
      .catch((error) => {
        // error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
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
              handleStartQuiz={this.handleStartQuiz}
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

export default withRouter(Content);
