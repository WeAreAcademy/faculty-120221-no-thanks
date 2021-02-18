import { Fragment, useReducer, useState } from "react";
import { creators, selectors } from "./state";
import { reducer } from "./state/reducer";
import { initialState } from "./state/state";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [typedName, setTypedName] = useState("");
  const activePlayerName = selectors.getActivePlayerName(state);
  const playersWithScores = selectors.getPlayersWithScores(state);
  const activeCard = selectors.getActiveCard(state);
  const activeChips = selectors.getActiveChips(state);

  const handleAddPlayer = () => {
    const existingPlayerNames = selectors.getPlayerNames(state);
    if (existingPlayerNames.includes(typedName)) {
      window.alert(
        "Can't add a player where the name already exists - player names should be unique"
      );
    } else if (typedName.length > 0) {
      dispatch(creators.addPlayer(typedName));
      setTypedName("");
    } else {
      window.alert("Player name too short!");
    }
  };

  const handleGameStart = () => {
    if (selectors.getPlayerCount(state) < 3) {
      window.alert("Too few players - minimum 3 needed");
    } else if (selectors.getPlayerCount(state) > 7) {
      window.alert("Too many players - max 7");
    } else {
      dispatch(creators.startGame());
    }
  };

  return (
    <div style={{ fontSize: "1.5rem" }}>
      <h1>No Thanks!</h1>
      <input
        placeholder="player name"
        value={typedName}
        onChange={(e) => setTypedName(e.target.value)}
      />
      <button onClick={handleAddPlayer}>Add player</button>
      <br />
      <button
        disabled={!selectors.getCanGameBeStarted(state)}
        onClick={handleGameStart}
      >
        Start game
      </button>
      <button
        disabled={!selectors.getIsGameOngoing(state)}
        onClick={() => dispatch(creators.playTakeCard(state.active))}
      >
        Take card
      </button>
      <button
        disabled={!selectors.getIsGameOngoing(state)}
        onClick={() => dispatch(creators.playNoThanks(state))}
      >
        No Thanks!
      </button>
      <hr />
      {activePlayerName && <h2>{activePlayerName}'s turn</h2>}
      {activeCard && (
        <h3>
          {activeCard} in play, {activeChips} counter
          {activeChips === 1 ? "" : "s"} on it
        </h3>
      )}
      {playersWithScores &&
        playersWithScores.map((player) => (
          <Fragment key={player.name}>
            <h3>{player.name}</h3>
            <ul>
              <li>Score: {player.score}</li>
              <li>Chips: {player.chips}</li>
              <li>Cards: {player.cards.join(", ")}</li>
            </ul>
          </Fragment>
        ))}
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default App;
