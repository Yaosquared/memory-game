import type { TitleProps } from "../types/home";
import "../styles/title.scss";

const Title = ({ text, selectedDifficulty }: TitleProps) => {
  return (
    <h1 className="title">
      {text} {selectedDifficulty ? `(${selectedDifficulty})` : null}
    </h1>
  );
};

export default Title;
