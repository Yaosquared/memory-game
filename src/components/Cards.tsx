import { useEffect } from "react";
import type { CardsProps } from "../types/home";
import toast from "react-hot-toast";
import Setup from "./modals/Setup";

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
}: CardsProps) => {
  // console.log("firstGuessIndex: ", firstGuessIndex);
  // console.log("secondGuessIndex: ", secondGuessIndex);
  // console.log("shuffledValues: ", shuffledValues.length);
  // console.log("matchedCards: ", matchedCards.length);
  // console.log(selectedDifficulty);

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
    const hasGameStarted = shuffledValues.length > 0 && matchedCards.length > 0;

    if (hasGameStarted && matchedCards.length === shuffledValues.length) {
      toast.success("You win!");
      setTimeout(() => {
        handleReset();
      }, 1500);
    }
  }, [matchedCards, shuffledValues.length, handleReset]);

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
