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
    } else {
      dispatch(creators.addPlayer(typedName));
      setTypedName("");
    }
  };

  return (
    <div style={{ fontSize: "1.5rem" }}>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <input
        placeholder="player name"
        value={typedName}
        onChange={(e) => setTypedName(e.target.value)}
      />
      <button onClick={handleAddPlayer}>Add player</button>
    </div>
  );
}

export default App;
