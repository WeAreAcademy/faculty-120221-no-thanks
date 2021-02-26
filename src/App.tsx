import React, { useState } from "react";
import "./styles.css";
import GameDeck from "./components/GameDeck";
import GameCard from "./components/GameCard";
import Counters from "./components/molecules/Counters";
import { getExamplePlayerNames, initialiseGame } from "./game/gameFunctions";
import { Card, Player } from "./game/types";

export default function App() {
  const [game, setGame] = useState(initialiseGame(getExamplePlayerNames()))
  console.log({game})
  return (
    <div className="App">
      <h1>No thanks!</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div className="general-info">
      <GameDeck cards={game.deck} />
      {game.active.card !== undefined && (<>Active card: <GameCard value={game.active.card} /></>)}
      Chips on card: <Counters n={game.active.chips} />
      </div>
      <div className="players">
        {game.players.map(player=> <>
        <PlayerCard player={player}/>
        </>)}
      </div>
    </div>
  );
}

interface PlayerCardProps {
  player: Player
}
function PlayerCard({player}: PlayerCardProps){
  const {chips, name,cards} = player
  return (
    <div className="player-card">
      <div className="name">{name}</div>
      <Counters n={chips}/>
      {cards.length ? cards.map((card: Card)=><GameCard value={card}/>): "No cards yet"}

    </div>
  )

}