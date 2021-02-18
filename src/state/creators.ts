import { actions } from "./reducer";
import { Card, Player } from "./types";

export const addPlayer = (playerName: string) => {
  const newPlayer: Player = {
    name: playerName,
    chips: 0, // assign later
    cards: [],
  };
  return actions.players.create.push(newPlayer);
};

export const generateCutDeck = () => {
  const wholeDeck: Card[] = Object.keys(Array(35)).map((n) => parseInt(n + 1));
};
