import { createSelector } from "reselect";
import { NoThanksGameState } from "./types";

export const getPlayers = (state: NoThanksGameState) => state.players;

export const getPlayerCount = createSelector(
  getPlayers,
  (players) => players.length
);

export const getIsLegalPlayerCount = createSelector(
  getPlayerCount,
  (count) => 3 <= count && count <= 7
);

export const getPlayerNames = createSelector(getPlayers, (players) =>
  players.map((player) => player.name)
);

export const getActiveCard = (state: NoThanksGameState) => state.active.card;

export const getDoesActiveCardExist = createSelector(
  getActiveCard,
  (activeCard) => !!activeCard
);

export const getActivePlayerIndex = (state: NoThanksGameState) =>
  state.active.playerIndex;

export const getActivePlayer = createSelector(
  getPlayers,
  getActivePlayerIndex,
  (players, idx) => (typeof idx === "number" ? players[idx] : undefined)
);
