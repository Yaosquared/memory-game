import type { MenuProps } from "../types/home";
import "../styles/menu.scss";

const Menu = ({ handleSetup, handleReset, selectedDifficulty }: MenuProps) => {
  return (
    <section className="menu">
      <button type="button" onClick={handleSetup}>
        Change Mode
      </button>
      {selectedDifficulty === "Extreme" ? null : (
        <button type="button" onClick={handleReset} className="restart_btn">
          Restart
        </button>
      )}
    </section>
  );
};

export default Menu;
