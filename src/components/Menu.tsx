import type { MenuProps } from "../types/home";

const Menu = ({ handleSetup, handleReset }: MenuProps) => {
  return (
    <section className="menu">
      <button type="button" onClick={handleSetup}>
        Change Mode
      </button>
      <button type="button" onClick={handleReset} className="restart_btn">
        Restart
      </button>
    </section>
  );
};

export default Menu;
