import riduce, { Riducer } from "riduce";
import { selectors } from ".";
import { initialState } from "./state";
import { NoThanksGameState, Player } from "./types";
import { findStartingChipCount } from "./utils";

const dealStartingChips: Riducer<{ leafState: Player[] }> = (players) => {
  const startingPlayerChips = findStartingChipCount(players.length);
  return players.map((player) => ({
    ...player,
    chips: startingPlayerChips,
  }));
};

// const playNoThanks: Riducer<{ leafState: NoThanksGameState }> = (gameState) => {
//   const playerChips = selectors.getActivePlayerChips(gameState);
//   if (typeof playerChips === "undefined" || playerChips < 1) {
//     return actions.create.noop();
//   }

//   const activeIndex = selectors.getActivePlayerIndex(gameState);

//   return {
//     ...gameState,
//     active: {
//       ...gameState.active,
//       chips: gameState.active.chips + 1
//     }
//   }

//   return bundle([
//     actions.players[activeIndex!].chips.create.increment(-1),
//     actions.active.chips.create.increment(),
//     progressActivePlayer(),
//   ]);
// };

const customReducers = {
  dealStartingChips,
};

const [reducer, actions] = riduce(initialState, customReducers);

export { reducer, actions };
