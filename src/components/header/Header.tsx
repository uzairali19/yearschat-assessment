import { Theme } from "../theme";

interface headerProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const Header: React.FC<headerProps> = ({ theme, setTheme }) => {
  return (
  <div className="navbar bg-base-100">
    <div className="navbar-start">
      <a className="btn btn-ghost normal-case text-xl">Years Chat</a>
    </div>
    <div className="navbar-end">
      <Theme themeType="toggle" theme={theme} setTheme={setTheme}  />
    </div>
  </div>);
}

export default Header;
