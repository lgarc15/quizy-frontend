import React from "react";
import { withRouter } from "react-router-dom";

import "../App.css";
import "../stylesheets/Question.css";

// Helper function used to sort an array containing possible answers.
function shuffleAnswers(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

class Question extends React.Component {
  constructor(props) {
    super(props);
    // Get the necessary information from props to display the question.
    const { questionMeta, totalNumQuestions } = this.props.location.state;
    // Construct an Array containing the possible answers, and shuffle.
    let answers = [{ answer: questionMeta["correct_answer"] }];
    questionMeta["incorrect_answers"].map((question) =>
      answers.push({ answer: question })
    );
    shuffleAnswers(answers);

    this.state = {
      questionMeta: questionMeta,
      totalNumQuestions: totalNumQuestions,
      answers: answers,
      disabled: false,
    };

    this.handleQuestionAnswer = this.handleQuestionAnswer.bind(this);
  }

  // Button handler used when a user answers a question.
  handleQuestionAnswer(e) {
    e.preventDefault();
    const answer = e.target.value;
    const { questionMeta } = this.state;
    const [isCorrect, correctAnswer] = this.props.handleUserAnswer(answer, questionMeta.id);

    // Display the according animation to say the question is correct. And then, move on to the next question.
    console.log("The answer for this question is: " + isCorrect + ". Correct Answer = " + correctAnswer);
    this.setState({disabled: true});
    
    // Create an animation to move to next questions.
  }

  render() {
    const { questionMeta, totalNumQuestions, answers, disabled } = this.state;

    return (
      <div id="quizContainer">
        <div id="quizProgress">
          Question {questionMeta.id}/{totalNumQuestions}
        </div>
        <div id="quizMeta">
          <h1 id="quizQuestion">{questionMeta.question}</h1>
          <form id="quizAnswers" onSubmit={null}>
            {answers.map((answerMeta, index) => (
              <button
                type={"button"}
                name={`answer_${index}`}
                value={answerMeta.answer}
                className={"quizAnswer"}
                key={index}
                onClick={this.handleQuestionAnswer}
                disabled={disabled}
              >
                {answerMeta.answer}
              </button>
            ))}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Question);
