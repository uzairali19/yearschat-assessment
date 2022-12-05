import { useState } from "react";
import { Body } from "../body";
import { Header } from "../header";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [theme, setTheme] = useState("light");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
      <div data-theme={theme} className=" min-h-screen">
        <Header
          theme={theme}
          setTheme={setTheme}
          loggedIn={loggedIn}
          username={username}
          setLoggedIn={setLoggedIn} />
        <Body
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setUsername={setUsername}
          socket={socket}
        />
      </div>
  );
}

export default App;
