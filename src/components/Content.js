import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import querystring from "querystring";

import "../App.css";
import "../stylesheets/Content.css";
import StartQuiz from "./StartQuiz";
import Question from "./Question";
import Results from "./Results";

// TODO: HAVE SMALL LITTLE LINKS TO PREVIOUSLY ANSWERED QUESTIONS AT THE BOTTOM.

// Returns the question with the given id.
const findQuestionById = function (questionArray, questionId) {
  return questionArray.find((question) => question.id === questionId);
};

// Returns the index of the question with the given id.
const findQuestionIndexById = function (questionArray, questionId) {
  return questionArray.findIndex((question) => question.id === questionId);
};

// Helper function used to sort an array containing possible answers.
function shuffleAnswers(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create an array based on the possible answers for the question.
function createAnswersArray(question) {
  let answers = [{ answer: question["correct_answer"] }];
  question["incorrect_answers"].map((question) =>
    answers.push({ answer: question })
  );
  shuffleAnswers(answers);
  return answers;
}

function findHighestAnsweredQuestion(questionsAnswered) {
  // Find the highest index from the questions answered.
  // That is the most number of questions the user has answered.
  // Do not allow the user to go past that.
}

function findHighestUnAnsweredQuestion(questionsAnswered) {
  // Find the highest index from the questions not answered.
  // That is the most number of questions the user has not answered.
  // Use this to feed the next question.
}

function tallyCorrectAnswers(questions) {
  let correct = 0;
  questions.forEach((question) => {
    if (question.user_answer_data.user_correct) {
      correct++;
    }
  });
  return correct;
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null,
      results: null,
    };

    this.handleStartQuiz = this.handleStartQuiz.bind(this);
    this.handleUserAnswer = this.handleUserAnswer.bind(this);
    this.moveToNextQuestion = this.moveToNextQuestion.bind(this);
    this.endQuiz = this.endQuiz.bind(this);
  }

  handleStartQuiz(queryStringsObj) {
    // TODO: Insert check to see if there is a quiz already active.
    // If there is, then prompt the user there is an active quiz and if the would like to continue.
    // If they do, then continue where they left off.
    // Else, let them start a new quiz.
    axios
      .get(
        `https://opentdb.com/api.php?${querystring.stringify(queryStringsObj)}`
      )
      .then((response) => {
        const questionsData = response.data.results;

        // Attach and ID to the questions (ID starting with 1).
        questionsData.map((item, index) => (item["id"] = index + 1));

        // Find the first question's index.
        const firstQuestion = findQuestionById(questionsData, 1);

        // Save the state of the quiz game.
        this.setState({
          questions: questionsData,
          currentQuestion: firstQuestion,
        });

        // Create an array based on the possible answers for the question.
        const answers = createAnswersArray(firstQuestion);

        this.props.history.push({
          pathname: `/question/${firstQuestion.id}`,
          state: {
            questionMeta: {
              id: firstQuestion.id,
              question: firstQuestion.question,
            },
            answers: answers,
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
    const { questions } = this.state;
    const questionAnsweredIndex = findQuestionIndexById(questions, questionId);
    const questionAnswered = questions[questionAnsweredIndex];

    // Record the user's answer and whether it was correct.
    questionAnswered.user_answer_data = {
      user_correct: questionAnswered.correct_answer === userAnswer,
      user_answer: userAnswer,
    };
    // Update the question answered.
    questions[questionAnsweredIndex] = questionAnswered;

    // Handle moving on to the next question.
    this.moveToNextQuestion(questions, questionId);
  }

  // Function to allow the child to notify when to move on to the next question.
  moveToNextQuestion(questions, questionAnsweredId) {
    const questionAnswered = findQuestionById(questions, questionAnsweredId);
    const nextQuestion = findQuestionById(questions, questionAnswered.id + 1);

    if (nextQuestion) {
      // Get the possible answers for the next question.
      const nextQuestionAnswers = createAnswersArray(nextQuestion);
      // Set the new quiz state.
      this.setState({
        questions: questions,
        currentQuestion: nextQuestion,
      });
      this.props.history.push({
        pathname: `/question/${nextQuestion.id}`,
        state: {
          questionMeta: {
            id: nextQuestion.id,
            question: nextQuestion.question,
          },
          answers: nextQuestionAnswers,
          totalNumQuestions: questions.length,
        },
      });
    } else {
      // TODO: ENSURE ALL THE QUESTIONS WERE ANSWERED.
        // IF NOT, THEN REDIRECT THE USER TO THE LOWEST QUESTION THEY HAVE NOT ANSWERED.
        // ELSE, DISPLAY THE RESULTS PAGE.

      // Finish the quiz, display the results.
      const numCorrect = tallyCorrectAnswers(questions);
      this.setState({
        results: {
          numCorrect: numCorrect,
          numTotalQuestions: questions.length,
        },
      });
      console.log(questions);
      this.props.history.push({
        pathname: "/results",
      });
    }
  }

  endQuiz() {
    console.log("Content: endQuiz");
  }

  render() {
    const { results } = this.state;
    return (
      <div className="bg-cl-1" id="content">
        <Switch>
          <Route exact path="/">
            <StartQuiz handleStartQuiz={this.handleStartQuiz} />
          </Route>
          <Route path="/question/:id">
            <Question handleUserAnswer={this.handleUserAnswer} />
          </Route>
          {results && (
            <Route path="/results">
              <Results quizResults={results} />
            </Route>
          )}
          <Route>Route not found</Route>
          {/* <Route path="/"></Route> */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(Content);
