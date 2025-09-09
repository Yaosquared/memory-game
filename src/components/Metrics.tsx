import { formatTime } from "../helpers/time";
import type { MetricsProps } from "../types/home";
import "../styles/metrics.scss";

const Metrics = ({
  seconds,
  moveCount,
  selectedDifficulty,
  allowedMoves,
}: MetricsProps) => {
  return (
    <section className="metrics">
      <h2>{formatTime(seconds)}</h2>
      <h2>
        Moves:{" "}
        {selectedDifficulty === "Extreme"
          ? `${moveCount}/${allowedMoves}`
          : moveCount}
      </h2>
    </section>
  );
};

export default Metrics;
