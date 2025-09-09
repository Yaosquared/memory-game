import type { SetupProps } from "../../types/home";
import "../../styles/setup.scss";

const Setup = ({ selectedDifficulty, setSelectedDifficulty }: SetupProps) => {
  const difficultyLevels = ["Easy", "Medium", "Hard", "Extreme"];

  return (
    <dialog open className="setup">
      <h2>Select level of difficulty:</h2>
      <div className="difficulty_options">
        {difficultyLevels.map((level) => (
          <button
            key={level}
            onClick={() => setSelectedDifficulty(level)}
            className={selectedDifficulty === level ? "selected" : ""}
          >
            {level}
          </button>
        ))}
      </div>
    </dialog>
  );
};

export default Setup;
