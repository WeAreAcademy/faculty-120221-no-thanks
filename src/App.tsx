import React from "react";
import "./styles.css";
import GameDeck from "./components/GameDeck";
import GameCard from "./components/GameCard";
import Counters from "./components/molecules/Counters";
import {
  groupCards,
  initialiseGame,
  randomiseGame,
} from "./game/gameFunctions";
import { Card, PlayerName } from "./game/types";
import CardSet from "./components/atoms/CardSet";

export default function App() {
  const game = randomiseGame(initialiseGame(["larry", "curly", "mo"]));
  return (
    <div className="App">
      <h1>No Thanks!</h1>
      <GameDeck cards={[3, 5]} />
      {game.players.map((p) => (
        <Player chips={p.chips} cards={p.cards} name={p.name} />
      ))}
      <GameCard value={5} />
      <Counters n={10} />
    </div>
  );
}
interface PlayerProps {
  chips: number;
  cards: Card[];
  name: PlayerName;
}
function Player({ name, chips, cards }: PlayerProps) {
  return (
    <div className="player">
      Player: {name}. Chips: {chips}.
      <br />
      Cards:{" "}
      <CardSet>
        {groupCards(cards).map((grp) => (
          <GameCardGroup cards={grp} />
        ))}
      </CardSet>
    </div>
  );
}
interface GameCardGroupProps {
  cards: Card[];
}
function GameCardGroup({ cards }: GameCardGroupProps) {
  return (
    <div className="cardGroup">
      {cards.map((c: Card) => (
        <GameCard value={c} />
      ))}
    </div>
  );
}
