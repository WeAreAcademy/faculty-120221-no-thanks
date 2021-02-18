import { actions } from "./reducer";
import { Player } from "./types";
import { generateCutDeck } from "./utils";

export const addPlayer = (playerName: string) => {
  const newPlayer: Player = {
    name: playerName,
    chips: 0, // assign later
    cards: [],
  };
  return actions.players.create.push(newPlayer);
};

export const formInitialDeck = () => {
  const initialDeck = generateCutDeck();
  console.log(initialDeck);
  return actions.deck.create.update(initialDeck);
};
