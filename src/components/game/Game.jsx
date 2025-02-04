import React, { useState, useEffect } from "react";
import "./game.css";

const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];

const Game = () => {
  const [targetColor, setTargetColor] = useState("");
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("Guess the correct color!");
  const [score, setScore] = useState(0);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newTarget = COLORS[Math.floor(Math.random() * COLORS.length)];
    setTargetColor(newTarget);
    setOptions([...COLORS]);
    setMessage("Guess the correct color!");
    setAnimationClass("");
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setMessage("Correct!");
      setScore((prevScore) => prevScore + 1);
      setAnimationClass("correct-animation");
    } else {
      setMessage("Wrong! Try again.");
      setAnimationClass("wrong-animation");
    }

    // Reset animation class after animation ends
    setTimeout(() => setAnimationClass(""), 500);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Color Guessing Game</h1>
      <div
        data-testid="colorBox"
        className="color-box"
        style={{ backgroundColor: targetColor }}
      ></div>
      <p data-testid="gameInstructions" className="game-instructions">
        {message}
      </p>
      <div className="color-options">
        {options.map((color) => (
          <button
            key={color}
            data-testid="colorOption"
            className={`color-button ${animationClass}`}
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          ></button>
        ))}
      </div>
      <p data-testid="score" className="game-score">
        Score: {score}
      </p>
      <button
        data-testid="newGameButton"
        className="new-game-button"
        onClick={startNewGame}
      >
        New Game
      </button>
    </div>
  );
};

export default Game;
