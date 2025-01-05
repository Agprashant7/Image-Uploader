import LogoIcon from "../../Icons/LogoIcon.tsx";
import MoonIcon from "../../Icons/MoonIcon.tsx";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="iconWrapper">
        <LogoIcon />
        <div className="themeIcon">
          <MoonIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
