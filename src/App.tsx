import React from "react";
import "./styles.css";
import GameDeck from "./components/GameDeck";
import GameCard from "./components/GameCard";
import Counters from "./components/molecules/Counters";

export default function App() {
  return (
    <div className="App">
      <h1>No thanks!</h1>
      <h2>Start editing to see some magic happen!</h2>
      <GameDeck cards={[3, 5]} />
      <GameCard value={5} />
      <Counters n={10} />
    </div>
  );
}
