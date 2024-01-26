import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    axios
      .get("/clues?limit=50")
      .then((response) => {
        if (response.data.status === "success") {
          setQuestions(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleQuestionClick = (question) => {
    const userAnswer = prompt(question.clue);
    if (userAnswer !== null) {
      checkAnswer(userAnswer, question.response);
      setSelectedQuestion(question.id);
    }
  };

  const checkAnswer = (userAnswer, correctAnswer) => {
    // Simple normalization for user answer and correct answer
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = correctAnswer.trim().toLowerCase();

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      alert("Correct Answer!");
      updateScore();
    } else {
      alert("Wrong Answer. Correct answer was: " + correctAnswer);
    }
  };

  const updateScore = () => {
    setScore((prevScore) => prevScore + 1); // Increment score by 1 for each correct answer
  };

  return (
    <div className="App">
      <header>
        <h1>Trivia Game</h1>
        <div>Score: {score}</div>
      </header>
      <div className="grid-container">
        {questions.map((question) => (
          <div
            key={question.id}
            className={`question ${
              selectedQuestion === question.id ? "selected" : ""
            }`}
            onClick={() => handleQuestionClick(question)}
          >
            {question.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
