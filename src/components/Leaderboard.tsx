import type { LeaderboardProps, PlayerInfoProps } from "../types/home";
import "../styles/leaderboard.scss";

const Leaderboard = ({
  selectedDifficulty,
  easyModeTopPlayers,
  mediumModeTopPlayers,
  hardModeTopPlayers,
  extremeModeTopPlayers,
}: LeaderboardProps) => {
  let topPlayers: PlayerInfoProps[] = [];

  if (selectedDifficulty === "Easy") {
    topPlayers = easyModeTopPlayers;
  } else if (selectedDifficulty === "Medium") {
    topPlayers = mediumModeTopPlayers;
  } else if (selectedDifficulty === "Hard") {
    topPlayers = hardModeTopPlayers;
  } else if (selectedDifficulty === "Extreme") {
    topPlayers = extremeModeTopPlayers;
  }

  return (
    <>
      {selectedDifficulty !== null ? (
        <div className="leaderboard">
          <h2>Leaderboard ({selectedDifficulty})</h2>
          {topPlayers.length > 0 ? (
            <>
              {topPlayers.map((info) => (
                <div
                  className="top_players"
                  key={`${selectedDifficulty}-${info.id}`}
                >
                  <div className="player_info">
                    <p>Rank #{info.rank}</p>
                    <p>{info.player}</p>
                  </div>
                  <div className="game_info">
                    <p>Moves Used: {info.movesUsed}</p>
                    <p>Time: {info.time}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="no_record">No records available yet...</p>
          )}
        </div>
      ) : (
        <div className="skeleton" />
      )}
    </>
  );
};

export default Leaderboard;
