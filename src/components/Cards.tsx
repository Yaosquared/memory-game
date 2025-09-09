import { useEffect, useState } from "react";
import type { CardsProps } from "../types/home";
import toast from "react-hot-toast";
import Setup from "./modals/Setup";
import "../styles/cards.scss";

const Cards = ({
  shuffledValues,
  firstGuessIndex,
  secondGuessIndex,
  setFirstGuessIndex,
  setSecondGuessIndex,
  incrementMoveCount,
  handleReset,
  matchedCards,
  setMatchedCards,
  selectedDifficulty,
  setSelectedDifficulty,
  gridSize,
  compareToTopPlayers,
  moveCount,
  allowedMoves,
  seconds,
  gameStarted,
}: CardsProps) => {
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  const handleMatch = (index: number) => {
    if (firstGuessIndex === index) return;

    if (firstGuessIndex === null) {
      setFirstGuessIndex(index);
    } else if (secondGuessIndex === null) {
      setSecondGuessIndex(index);
      incrementMoveCount();
    }
  };

  useEffect(() => {
    if (firstGuessIndex !== null && secondGuessIndex !== null) {
      const firstValue = shuffledValues[firstGuessIndex];
      const secondValue = shuffledValues[secondGuessIndex];

      if (firstValue === secondValue) {
        toast.success("Correct pair!");
        setMatchedCards((prev) => [...prev, firstGuessIndex, secondGuessIndex]);
      } else {
        toast.error("Wrong pair. Keep going!");
      }

      setTimeout(() => {
        setFirstGuessIndex(null);
        setSecondGuessIndex(null);
      }, 1000);
    }
  }, [firstGuessIndex, secondGuessIndex]);

  useEffect(() => {
    if (!gameStarted) return;

    const isExtremeMode = selectedDifficulty === "Extreme";
    const hasGameEnded = gameWon || gameLost;

    const lossCondition =
      isExtremeMode && (moveCount >= allowedMoves || seconds === 0);
    const winCondition =
      shuffledValues.length > 0 &&
      matchedCards.length === shuffledValues.length &&
      !gameWon;

    if (winCondition && !hasGameEnded) {
      setGameWon(true);
      compareToTopPlayers();

      toast.success("You win!");
      setTimeout(() => {
        handleReset();
        setGameLost(false);
      }, 1500);
    } else if (lossCondition && !hasGameEnded) {
      setGameLost(true);
      toast.error("You lost. Try again");

      setTimeout(() => {
        handleReset();
        setGameLost(false);
      }, 1500);
    }
  }, [
    matchedCards,
    shuffledValues.length,
    handleReset,
    gameWon,
    moveCount,
    allowedMoves,
    seconds,
    selectedDifficulty,
  ]);

  useEffect(() => {
    setGameWon(false);
    setGameLost(false);
  }, [shuffledValues]);

  return (
    <>
      {selectedDifficulty !== null ? (
        <section
          className="cards"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
        >
          {shuffledValues.map((value, index) => {
            const isFlipped =
              index === firstGuessIndex ||
              index === secondGuessIndex ||
              matchedCards.includes(index);

            return (
              <button
                type="button"
                onClick={() => handleMatch(index)}
                className={`card ${isFlipped ? "flipped" : ""}`}
                key={index}
                disabled={matchedCards.includes(index)}
                aria-label={isFlipped ? `Card value ${value}` : "Hidden card"}
              >
                <div className="face_down" aria-hidden={isFlipped}></div>
                <div className="face_up" aria-hidden={!isFlipped}>
                  {value}
                </div>
              </button>
            );
          })}
        </section>
      ) : (
        <Setup
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
        />
      )}
    </>
  );
};

export default Cards;
