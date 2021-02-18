import { createSelector } from "reselect";
import { NoThanksGameState } from "./types";

export const getRemainingDeck = (state: NoThanksGameState) => state.deck;
export const getRemainingDeckLength = createSelector(
  getRemainingDeck,
  (deck) => deck.length
);

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

export const getActivePlayerChips = createSelector(
  getActivePlayer,
  (player) => player?.chips
);

export const getActivePlayerHasChips = createSelector(
  getActivePlayerChips,
  (chips) => !!chips
);

export const getIsGameOngoing = createSelector(
  getRemainingDeckLength,
  getActiveCard,
  (remainingDeck, activeCard) => !!(remainingDeck || activeCard)
);

export const getCanGameBeStarted = createSelector(
  getIsLegalPlayerCount,
  getIsGameOngoing,
  (isLegalPlayerCount, isGameOngoing) => isLegalPlayerCount && !isGameOngoing
);
