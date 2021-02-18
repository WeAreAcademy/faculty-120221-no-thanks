import { actions } from "./reducer";
import { Player } from "./types";

export const addPlayer = (playerName: string) => {
  const newPlayer: Player = {
    name: playerName,
    chips: 0, // assign later
    cards: [],
  };
  return actions.players.create.push(newPlayer);
};
