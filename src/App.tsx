import React, { useState } from "react";
import "./styles.css";
import GameDeck from "./components/GameDeck";
import {
  applyAction,
  currentPlayer,
  initialiseGame,
  makeRandomGame,
  randomiseGame,
  validActions,
} from "./game/gameFunctions";
import { Player } from "./Player";
import { Action, NoThanksGame } from "./game/types";
import GameCard, { CardInPlay } from "./components/GameCard";

export default function App() {
  const initialGame = makeRandomGame();
  const [game, setGame] = useState(initialGame);

  function handleAddChipClicked() {
    const nextGame: NoThanksGame = applyAction(game, Action.PutChip);
    setGame({ ...nextGame });
  }
  function handleTakeCardClicked() {
    const nextGame: NoThanksGame = applyAction(game, Action.TakeCard);
    setGame({ ...nextGame });
  }
  function handleRandomiseGameClick() {
    setGame({ ...makeRandomGame() });
  }
  function handleNewGameClick() {
    setGame(initialiseGame(["Richard", "Esme", "Neill"]));
  }
  return (
    <div className="App">
      <h1>No Thanks!</h1>
      <div className="deck-and-active">
        <GameDeck cards={game.deck} />
        {game.active.card && (
          <CardInPlay value={game.active.card} chipsOn={game.active.chips} />
        )}
        {validActions(game).includes(Action.PutChip) && (
          <button onClick={handleAddChipClicked}>Add Chip</button>
        )}
        {validActions(game).includes(Action.TakeCard) && (
          <button onClick={handleTakeCardClicked}>Take Card</button>
        )}
        {<button onClick={handleNewGameClick}>New Game</button>}
        {<button onClick={handleRandomiseGameClick}>Randomise Game</button>}
      </div>

      {game.players.map((p) => (
        <Player
          chips={p.chips}
          cards={p.cards}
          name={p.name}
          active={currentPlayer(game) === p}
          key={p.name}
        />
      ))}
    </div>
  );
}
