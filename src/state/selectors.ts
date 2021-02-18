import { createSelector } from "reselect";
import { NoThanksGameState } from "./types";

export const getPlayers = (state: NoThanksGameState) => state.players;

export const getPlayerNames = createSelector(getPlayers, (players) =>
  players.map((player) => player.name)
);
