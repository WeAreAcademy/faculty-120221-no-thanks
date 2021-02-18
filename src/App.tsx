import { useState } from "react";
import { useRiducer } from "riduce";
import { initialState } from "./state/state";

function App() {
  const {
    state: gameState,
    dispatch: gameDispatch,
    actions: gameActions,
  } = useRiducer(initialState);

  const [typedName, setTypedName] = useState("");

  const handleAddPlayer = () => {};

  return (
    <div style={{ fontSize: "1.5rem" }}>
      <pre>{JSON.stringify(gameState, null, 2)}</pre>
      <input
        placeholder="player name"
        value={typedName}
        onChange={(e) => setTypedName(e.target.value)}
      />
      <button>Add player</button>
    </div>
  );
}

export default App;
