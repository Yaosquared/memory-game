import type { SetupProps } from "../../types/home";
import "../../styles/setup.scss";
import { useEffect, useState } from "react";

const Setup = ({ setSelectedDifficulty }: SetupProps) => {
  const difficultyLevels = ["Easy", "Medium", "Hard", "Extreme"];
  const [playerName, setPlayerName] = useState("Guest");
  const [selectedLevel, setSelectedLevel] = useState("Medium");

  const handleSubmit = (formData: FormData) => {
    const name = formData.get("playerName") as string;
    const preferences = {
      playerName: name,
      selectedLevel,
    };

    localStorage.setItem("playerPreferences", JSON.stringify(preferences));
    setPlayerName(name);
    setSelectedDifficulty(selectedLevel);
  };

  useEffect(() => {
    const storedPreferences = localStorage.getItem("playerPreferences");

    if (storedPreferences) {
      try {
        const parsedPreferences = JSON.parse(storedPreferences);
        if (parsedPreferences?.playerName) {
          setPlayerName(parsedPreferences.playerName);
        }
        if (parsedPreferences?.selectedLevel) {
          setSelectedLevel(parsedPreferences.selectedLevel);
        }
      } catch (error) {
        console.error("Failed to parse player preferences:", error);
      }
    }
  }, []);

  return (
    <dialog open className="setup">
      <form action={handleSubmit}>
        <div className="player_section">
          <h3>Enter Player Name:</h3>
          <input
            type="text"
            name="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>
        <div className="difficulty_section">
          <h3>Select level of difficulty:</h3>
          <div className="difficulty_options">
            {difficultyLevels.map((level) => (
              <button
                type="button"
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={selectedLevel === level ? "selected" : ""}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </dialog>
  );
};

export default Setup;
