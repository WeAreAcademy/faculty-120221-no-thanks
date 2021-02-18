import riduce, { Riducer } from "riduce";
import { initialState } from "./state";
import { Player } from "./types";
import { findStartingChipCount } from "./utils";

const dealStartingChips: Riducer<{ leafState: Player[] }> = (players) => {
  const startingPlayerChips = findStartingChipCount(players.length);
  return players.map((player) => ({
    ...player,
    chips: startingPlayerChips,
  }));
};

const customReducers = {
  dealStartingChips,
};

const [reducer, actions] = riduce(initialState, customReducers);

export { reducer, actions };
