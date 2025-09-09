import Title from "../components/Title";
import "../styles/home.scss";
import Cards from "../components/Cards";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import Metrics from "../components/Metrics";
// import Leaderboard from "../components/Leaderboard";

const Home = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    "Medium"
  );
  const [values, setValues] = useState<number[]>([]);
  const [shuffledValues, setShuffledValues] = useState<number[]>([]);
  const [firstGuessIndex, setFirstGuessIndex] = useState<number | null>(null);
  const [secondGuessIndex, setSecondGuessIndex] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [seconds, setSeconds] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  // NOTE: for getting time on finish
  // const [endTime, setEndTime] = useState<number>(0);

  // const formatTime = (seconds: number) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const secs = seconds % 60;

  //   return `${minutes.toString().padStart(2, "0")}:${secs
  //     .toString()
  //     .padStart(2, "0")}`;
  // };

  // console.log("finish: ", formatTime(endTime));

  // dynamically set grid based on selected difficulty
  useEffect(() => {
    let tempValues: number[] = [];

    if (selectedDifficulty === "Easy") {
      tempValues = Array.from({ length: 2 }, (_, i) => i + 1);
    } else if (selectedDifficulty === "Medium") {
      tempValues = Array.from({ length: 8 }, (_, i) => i + 1);
    } else {
      tempValues = Array.from({ length: 18 }, (_, i) => i + 1);
    }

    setValues(tempValues);
  }, [selectedDifficulty]);

  const getGridSize = () => {
    if (selectedDifficulty === "Easy") {
      return 2;
    } else if (selectedDifficulty === "Medium") {
      return 4;
    } else {
      return 6;
    }
  };

  const handleShuffle = () => {
    const duplicatedValues = [...values, ...values];
    const shuffledValues = duplicatedValues.sort(() => Math.random() - 0.5);
    setShuffledValues(shuffledValues);
  };

  const incrementMoveCount = () => {
    setMoveCount((moveCount) => moveCount + 1);
  };

  const handleSetup = () => {
    setSelectedDifficulty(null);
    setValues([]);
    handleReset();
  };

  const handleReset = () => {
    // setEndTime(seconds);
    setFirstGuessIndex(null);
    setSecondGuessIndex(null);
    setSeconds(0);
    setMoveCount(0);
    setMatchedCards([]);
    setGameStarted(false);
    handleShuffle();
  };

  useEffect(() => {
    if (!gameStarted && firstGuessIndex !== null) {
      setGameStarted(true);
    }
  }, [firstGuessIndex, gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;

    let interval = 0;

    interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [gameStarted]);

  useEffect(() => {
    if (values.length > 0) {
      handleShuffle();
    }
  }, [values]);

  return (
    <main className="container">
      <Title text="Memory Game" selectedDifficulty={selectedDifficulty} />
      <div className="sub_container">
        {/* <Leaderboard /> */}
        <div className="cards_section">
          {selectedDifficulty ? (
            <Metrics seconds={seconds} moveCount={moveCount} />
          ) : null}
          <Cards
            shuffledValues={shuffledValues}
            firstGuessIndex={firstGuessIndex}
            secondGuessIndex={secondGuessIndex}
            setFirstGuessIndex={setFirstGuessIndex}
            setSecondGuessIndex={setSecondGuessIndex}
            incrementMoveCount={incrementMoveCount}
            handleReset={handleReset}
            matchedCards={matchedCards}
            setMatchedCards={setMatchedCards}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            gridSize={getGridSize()}
          />
          {selectedDifficulty ? (
            <Menu handleSetup={handleSetup} handleReset={handleReset} />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Home;
