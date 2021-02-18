import { shuffle } from "lodash";
import { actions } from "./reducer";
import { Card, Player } from "./types";
import { generateWholeDeck } from "./utils";

export const addPlayer = (playerName: string) => {
  const newPlayer: Player = {
    name: playerName,
    chips: 0, // assign later
    cards: [],
  };
  return actions.players.create.push(newPlayer);
};
