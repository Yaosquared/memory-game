import Title from "../components/Title";
import "../styles/home.scss";
import Cards from "../components/Cards";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import Metrics from "../components/Metrics";
import Leaderboard from "../components/Leaderboard";
import type { PlayerInfoProps } from "../types/home";
import { formatTime, parseTime } from "../helpers/time";

const Home = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [values, setValues] = useState<number[]>([]);
  const [shuffledValues, setShuffledValues] = useState<number[]>([]);
  const [firstGuessIndex, setFirstGuessIndex] = useState<number | null>(null);
  const [secondGuessIndex, setSecondGuessIndex] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [seconds, setSeconds] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const allowedMoves = 50;

  const storedEasyModeTopPlayers = JSON.parse(
    localStorage.getItem("easyModeTopPlayers") || "[]"
  );
  const storedMediumModeTopPlayers = JSON.parse(
    localStorage.getItem("mediumModeTopPlayers") || "[]"
  );
  const storedHardModeTopPlayers = JSON.parse(
    localStorage.getItem("hardModeTopPlayers") || "[]"
  );
  const storedExtremeModeTopPlayers = JSON.parse(
    localStorage.getItem("extremeModeTopPlayers") || "[]"
  );

  const [easyModeTopPlayers, setEasyModeTopPlayers] = useState<
    PlayerInfoProps[]
  >(storedEasyModeTopPlayers);
  const [mediumModeTopPlayers, setMediumModeTopPlayers] = useState<
    PlayerInfoProps[]
  >(storedMediumModeTopPlayers);
  const [hardModeTopPlayers, setHardModeTopPlayers] = useState<
    PlayerInfoProps[]
  >(storedHardModeTopPlayers);
  const [extremeModeTopPlayers, setExtremeModeTopPlayers] = useState<
    PlayerInfoProps[]
  >(storedExtremeModeTopPlayers);

  useEffect(() => {
    const storedPreferences = localStorage.getItem("playerPreferences");
    if (!storedPreferences) {
      return;
    } else {
      try {
        const parsedPreferences = JSON.parse(storedPreferences);
        if (parsedPreferences?.selectedLevel) {
          setSelectedDifficulty(parsedPreferences.selectedLevel);
        }
      } catch {
        console.error("Invalid playerPreferences in localStorage.");
      }
    }
  }, []);

  // dynamically set grid based on selected difficulty
  useEffect(() => {
    let tempValues: number[] = [];

    if (selectedDifficulty === "Easy") {
      tempValues = Array.from({ length: 2 }, (_, i) => i + 1);
    } else if (selectedDifficulty === "Medium") {
      tempValues = Array.from({ length: 8 }, (_, i) => i + 1);
    } else if (selectedDifficulty === "Hard") {
      tempValues = Array.from({ length: 18 }, (_, i) => i + 1);
    } else if (selectedDifficulty === "Extreme") {
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
    setFirstGuessIndex(null);
    setSecondGuessIndex(null);
    setSeconds(selectedDifficulty === "Extreme" ? 180 : 0);
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

    if (selectedDifficulty === "Extreme") {
      const interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds <= 1) {
            clearInterval(interval);
            return 0;
          }
          return seconds - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [gameStarted, selectedDifficulty]);

  useEffect(() => {
    if (values.length > 0) {
      handleShuffle();
    }
  }, [values]);

  // initialize base time when difficulty changes
  useEffect(() => {
    if (selectedDifficulty === "Extreme") {
      setSeconds(180);
    } else if (selectedDifficulty) {
      setSeconds(0);
    }
  }, [selectedDifficulty]);

  const compareToTopPlayers = () => {
    let mode;
    let setterFunction;

    if (selectedDifficulty === "Easy") {
      mode = "easyModeTopPlayers";
      setterFunction = setEasyModeTopPlayers;
    } else if (selectedDifficulty === "Medium") {
      mode = "mediumModeTopPlayers";
      setterFunction = setMediumModeTopPlayers;
    } else if (selectedDifficulty === "Hard") {
      mode = "hardModeTopPlayers";
      setterFunction = setHardModeTopPlayers;
    } else if (selectedDifficulty === "Extreme") {
      mode = "extremeModeTopPlayers";
      setterFunction = setExtremeModeTopPlayers;
    } else {
      console.error("Something went wrong");
      return;
    }

    const storedPlayers: PlayerInfoProps[] = JSON.parse(
      localStorage.getItem(`${mode}`) || "[]"
    );

    const playerPreferences = JSON.parse(
      localStorage.getItem("playerPreferences") || "{}"
    );
    const playerName = playerPreferences.playerName || "Guest";

    const newPlayer: PlayerInfoProps = {
      id: storedPlayers.length + 1,
      rank: 0,
      player: playerName,
      movesUsed: moveCount,
      time: formatTime(seconds),
    };

    storedPlayers.push(newPlayer);
    storedPlayers.sort((a, b) => {
      if (a.movesUsed !== b.movesUsed) {
        return a.movesUsed - b.movesUsed;
      }

      return parseTime(a.time) - parseTime(b.time);
    });

    const top3Players = storedPlayers.slice(0, 3);
    top3Players.forEach((player, index) => {
      player.rank = index + 1;
    });

    localStorage.setItem(`${mode}`, JSON.stringify(top3Players));

    setterFunction(top3Players);
  };

  return (
    <main className="container">
      <Title text="Memory Game" selectedDifficulty={selectedDifficulty} />
      <div className="sub_container">
        <Leaderboard
          selectedDifficulty={selectedDifficulty}
          easyModeTopPlayers={easyModeTopPlayers}
          mediumModeTopPlayers={mediumModeTopPlayers}
          hardModeTopPlayers={hardModeTopPlayers}
          extremeModeTopPlayers={extremeModeTopPlayers}
        />
        <div className="cards_section">
          {selectedDifficulty ? (
            <Metrics
              seconds={seconds}
              moveCount={moveCount}
              selectedDifficulty={selectedDifficulty}
              allowedMoves={allowedMoves}
            />
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
            compareToTopPlayers={compareToTopPlayers}
            moveCount={moveCount}
            allowedMoves={allowedMoves}
            seconds={seconds}
            gameStarted={gameStarted}
          />
          {selectedDifficulty ? (
            <Menu
              handleSetup={handleSetup}
              handleReset={handleReset}
              selectedDifficulty={selectedDifficulty}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Home;
