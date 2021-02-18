import { Action } from "riduce";
import { actions } from "./reducer";
import { Player } from "./types";
import { generateCutDeck } from "./utils";

export const addPlayer = (playerName: string): Action => {
  const newPlayer: Player = {
    name: playerName,
    chips: 0, // assign later
    cards: [],
  };
  return actions.players.create.push(newPlayer);
};

export const dealChips = (): Action => {};

export const formInitialDeck = (): Action => {
  const initialDeck = generateCutDeck();
  return actions.deck.create.update(initialDeck);
};
