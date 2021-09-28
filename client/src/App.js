import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { GlobalStateProvider } from "./GlobalState";
import Headers from "./components/headers/Headers";
import MainPage from "./components/mainpages/Pages";

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <div className="App">
          <Headers />
          <MainPage/>
        </div>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
