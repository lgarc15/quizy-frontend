import React from "react";
import { withRouter } from "react-router-dom";

import "../App.css";
import "../stylesheets/StartQuiz.css";

class StartQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      amount: 10,
      category: "any",
      difficulty: "any",
      type: "any",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    // Check to see if there are any active quizzes?
    // If so, then have a modal show that there is an active quiz.
    // And, if they would like to continue it. Also, mention that
    // unfinished quizzes are not saved.
    // Otherwise, continute to starting the quiz.
    if (this.props.questionsToAsk) {
      // Show the modal.
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSelectChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let queryStringsObj = { amount: this.state.amount };

    if (this.state.category !== "any") {
        queryStringsObj["category"] = this.state.category;
    }
    if (this.state.difficulty !== "any") {
        queryStringsObj["difficulty"] = this.state.difficulty;
    }
    if (this.state.type !== "any") {
        queryStringsObj["type"] = this.state.type;
    }

    this.props.handleStartQuiz(queryStringsObj);
  }

  render() {
    return (
      <div className="main-content" id="startQuiz">
        <h1 id="welcomeMessage">Welcome to Quizy!</h1>
        <p>
          Think you know a lot about a wide variety of topics? Then Quizy is the
          right place for you. You will be tested on whatever subjects you want,
          and the best part is you get to choose your difficulty. If some of the
          questions are too hard for you, then tone the difficulty down and see
          your progress skyrocket!
        </p>
        <form id="quizSettingsForm" onSubmit={this.handleSubmit}>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="questionAmount">Question Amount (Default 10):</label>
          <input
            type="text"
            id="questionAmount"
            name="amount"
            value={this.state.amount}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="quizQuestionCategory">Select Category:</label>
          <select
            htmlFor="quizSettingsForm"
            name="category"
            id="quizQuestionCategory"
            value={this.state.category}
            onChange={this.handleSelectChange}
          >
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </select>

          <label htmlFor="quizQuestionDifficulty">Select Difficulty:</label>
          <select
            htmlFor="quizSettingsForm"
            name="difficulty"
            id="quizQuestionDifficulty"
            value={this.state.difficulty}
            onChange={this.handleSelectChange}
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <label htmlFor="quizQuestionType">Select Type:</label>
          <select
            htmlFor="quizSettingsForm"
            name="type"
            id="quizQuestionType"
            value={this.state.type}
            onChange={this.handleSelectChange}
          >
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>

          <input
            type="submit"
            value="Start Quiz!"
            id="quizSettingsFormSubmit"
          />
        </form>
      </div>
    );
  }
}

export default withRouter(StartQuiz);
