import { createSelector } from "reselect";
import { NoThanksGameState } from "./types";

export const getPlayers = (state: NoThanksGameState) => state.players;
export const getPlayerCount = createSelector(
  getPlayers,
  (players) => players.length
);
export const getPlayerNames = createSelector(getPlayers, (players) =>
  players.map((player) => player.name)
);
export const getActiveCard = (state: NoThanksGameState) => state.active.card;
export const getDoesActiveCardExist = createSelector(
  getActiveCard,
  (activeCard) => !!activeCard
);
