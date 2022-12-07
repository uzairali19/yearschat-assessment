import { Theme } from "../theme";
import { HeaderProps } from "../types";
import styled from 'styled-components'

const StyledHeader = styled.div.attrs({
  className: "navbar bg-primary text-base-400",
})`
& a: {
    color: #fff;
  },
  button: {
    color: #fff;
  }

`

const Header: React.FC<HeaderProps> = ({ theme, setTheme, loggedIn, username, setLoggedIn}) => {

  const logout = async () => {
    await fetch("http://localhost:3001/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.loggedIn === false){
        setLoggedIn(data.loggedIn);
      }
    })
    .catch(err => console.log(err))
  }

  const capitalCase = (str: string) => {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };


  return (
  <StyledHeader>
    <div className="navbar-start">
      <a className="normal-case text-xl">
        Years Chat{loggedIn ? ',': null}
        <span className="capitalize text-sm pl-1">{loggedIn ? `logged in as ${capitalCase(username)}` : null}</span>
      </a>
    </div>
    <div className="navbar-end">
      <Theme themeType="toggle" theme={theme} setTheme={setTheme}  />
      {loggedIn ? <button className="btn btn-ghost" onClick={logout}>Logout</button> : null}
    </div>
  </StyledHeader>
  )
}

export default Header;
