import React, { useState } from "react";
import "./styles.css";
import GameDeck from "./components/GameDeck";
import Counters from "./components/molecules/Counters";
import {
  currentPlayer,
  initialiseGame,
  randomiseGame,
} from "./game/gameFunctions";
import { Player } from "./Player";

export default function App() {
  const initialGame = randomiseGame(initialiseGame(["Larry", "Curly", "Mo"]));
  const [game, setGame] = useState(initialGame);

  return (
    <div className="App">
      <h1>No Thanks!</h1>
      <GameDeck cards={game.deck} />
      {game.active.playerIdx}
      {game.players.map((p) => (
        <Player
          chips={p.chips}
          cards={p.cards}
          name={p.name}
          isActive={currentPlayer(game) === p}
          key={p.name}
        />
      ))}
      <Counters n={10} />
    </div>
  );
}
