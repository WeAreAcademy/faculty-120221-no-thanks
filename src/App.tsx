import { useReducer, useState } from "react";
import { creators, selectors } from "./state";
import { reducer } from "./state/reducer";
import { initialState } from "./state/state";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [typedName, setTypedName] = useState("");

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

  const handleDealChips = () => {
    if (selectors.getPlayerCount(state) < 3) {
      window.alert("Too few players - minimum 3 needed");
    } else if (selectors.getPlayerCount(state) > 7) {
      window.alert("Too many players - max 7");
    } else {
      dispatch(creators.dealChips());
    }
  };

  const handleFlipCard = () => {
    if (selectors.getDoesActiveCardExist(state)) {
      window.alert("Can't flip a card when there is already an active card");
    } else {
      dispatch(creators.flipFromDeck());
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
      <input
        placeholder="player name"
        value={typedName}
        onChange={(e) => setTypedName(e.target.value)}
      />
      <button onClick={handleAddPlayer}>Add player</button>
      <br />
      <button onClick={handleGameStart}>Start game</button>
      <button onClick={() => dispatch(creators.formInitialDeck())}>
        Form initial deck
      </button>
      <button onClick={handleDealChips}>Deal chips</button>
      <button onClick={handleFlipCard}>Flip card</button>
      <hr />
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default App;
