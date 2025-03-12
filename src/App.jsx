import React, { useState, useEffect } from "react";
import "./App.css";

const Game = () => {
  const [playerX, setPlayerX] = useState(350);
  const [hazardY, setHazardY] = useState(-50);
  const [hazardX, setHazardX] = useState(Math.random() * 600 + 100);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (isGameOver) return;

    const handleKeyDown = (event) => {
      if (event.key === "a" || event.key === "ArrowLeft") {
        setPlayerX((prevX) => Math.max(100, prevX - 20));
      } else if (event.key === "d" || event.key === "ArrowRight") {
        setPlayerX((prevX) => Math.min(600, prevX + 20));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver) return;

    const gameLoop = setInterval(() => {
      setHazardY((prevY) => {
        if (prevY > 600) {
          setScore((prev) => prev + 10);
          setHazardX(Math.random() * 600 + 100);
          return -50;
        }
        return prevY + 10;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [isGameOver, hazardX]);

  useEffect(() => {
    if (
      hazardY + 50 >= 500 &&
      hazardX < playerX + 50 &&
      hazardX + 50 > playerX
    ) {
      setIsGameOver(true);
    }
  }, [hazardY, playerX, hazardX]);

  return (
    <div className="game-container">
      <div className="player" style={{ left: `${playerX}px` }}></div>
      <div
        className="hazard"
        style={{ top: `${hazardY}px`, left: `${hazardX}px` }}
      ></div>
      <div className="score">Score: {score}</div>
      {isGameOver && <div className="game-over">GAME OVER</div>}
    </div>
  );
};

export default Game;
