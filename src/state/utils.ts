import { Card } from "./types";

export const generateWholeDeck = (): Card[] => {
  return Object.keys(Array(35)).map((n) => parseInt(n + 1)) as Card[];
};
