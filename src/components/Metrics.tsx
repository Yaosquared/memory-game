import type { MetricsProps } from "../types/home";

const Metrics = ({ seconds, moveCount }: MetricsProps) => {
  // format seconds into mm:ss format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <section className="metrics">
      <h2>{formatTime(seconds)}</h2>
      <h2>Moves: {moveCount}</h2>
    </section>
  );
};

export default Metrics;
