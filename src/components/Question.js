import React from "react";
import { Modal, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import he from "he";

import "../App.css";
import "../stylesheets/Question.css";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    // const { questionMeta, answers, totalNumQuestions } = this.props.location.state;
    // TODO: Check if the questionMeta.id is in accordance with Content.js. Have it call a function linked to the parent.
    // If it is not, then have content.js redirect to the appropriate page.
    // If the quiz answer the user types in is valid (i.e. they have answered the question before then redirect to that page)
    // If the quiz answer the user types in is invalid (i.e. It's a number higher than max questions or they haven't answered it, then redirect to the last question they answered)
    // If it is, do nothing.
    // In this upper function, ensure that the user could not answer again. That the buttons are disabled if it was answered wrong.

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleQuestionAnswer = this.handleQuestionAnswer.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount");
    const { history } = this.props;
    const that = this;
    window.addEventListener("popstate", function (e) {
      history.go(1);
      that.showModal();
    });
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.location.state.questionMeta.id !==
      this.props.location.state.questionMeta.id
    ) {
      // // Display the next question by updating the state.
      // const { questionMeta, answers, totalNumQuestions } = this.props.location.state;
      // this.setState({
      //   questionMeta: questionMeta,
      //   answers: answers,
      //   totalNumQuestions: totalNumQuestions,
      //   disabled: false
      // });
    }
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  showModal() {
    this.setState({
      showModal: true,
    });
  }

  // Button handler used when a user answers a question.
  handleQuestionAnswer(e) {
    e.preventDefault();

    const answer = e.target.value;
    const { questionMeta } = this.props.location.state;

    this.props.handleUserAnswer(answer, questionMeta.id);
  }

  render() {
    const { showModal } = this.state;
    const {
      questionMeta,
      totalNumQuestions,
      answers,
      disabled,
    } = this.props.location.state;

    return (
      <div className="main-content" id="quizContainer">
        <div id="quizProgress">
          Question {questionMeta.id}/{totalNumQuestions}
        </div>
        <div id="quizMeta">
          <h1 id="quizQuestion">{he.decode(questionMeta.question)}</h1>
          <form id="quizAnswers" onSubmit={null}>
            {answers.map((answerMeta, index) => (
              <button
                type={"button"}
                name={`answer_${index}`}
                value={answerMeta.answer}
                className={"quizAnswerBtn"}
                key={index}
                onClick={this.handleQuestionAnswer}
                disabled={disabled}
              >
                {he.decode(answerMeta.answer)}
              </button>
            ))}
          </form>
        </div>

        <Modal show={showModal} onHide={this.closeModal} size="md" centered>
          <Modal.Header closeButton>
            <Modal.Title>Reset Quiz</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Going back will reset the quiz. Would you like to continue?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            <Button variant="danger" onClick={this.props.resetQuiz}>
              Reset Quiz
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Question);
