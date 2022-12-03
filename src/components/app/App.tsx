import { useState } from "react";
import { Body } from "../body";
import { Header } from "../header";

function App() {
  const [theme, setTheme] = useState("light");

  return (
      <div data-theme={theme} className=" min-h-screen">
        <Header
        theme={theme}
        setTheme={setTheme} />
        <Body/>
      </div>
  );
}

export default App;
