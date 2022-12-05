import { Theme } from "../theme";

interface headerProps {
  theme: string;
  setTheme: (theme: string) => void;
  loggedIn: boolean;
  username: string;
  setLoggedIn: (loggedIn: boolean) => void;
}

const Header: React.FC<headerProps> = ({ theme, setTheme, loggedIn, username, setLoggedIn}) => {

  const logout = async () => {
    await fetch("http://localhost:3001/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.loggedIn === false){
        setLoggedIn(false);
      }
    })
    .catch(err => console.log(err))
  }

  return (
  <div className="navbar bg-base-100">
    <div className="navbar-start">
      <a className="normal-case text-xl">
        Years Chat{loggedIn ? ',': null}
        <span className="capitalize text-sm pl-1">{loggedIn ? `logged in as ${username}` : null}</span>
      </a>
    </div>
    <div className="navbar-end">
      <Theme themeType="toggle" theme={theme} setTheme={setTheme}  />
      {loggedIn ? <button className="btn btn-ghost" onClick={logout}>Logout</button> : null}
    </div>
  </div>);
}

export default Header;
