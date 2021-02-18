import { shuffle } from "lodash";
import { Card, Player } from "./types";

export const calculateCardTotal = (cards: Card[]): number => {
  const [firstCard, ...remainingCards] = cards.sort();
  let total = firstCard;
  let previous = firstCard;
  for (let currentCard of remainingCards) {
    if (previous + 1 !== currentCard) total += currentCard;
    previous = currentCard;
  }
  return total;
};

export const calculatePlayerScore = (player: Player): number => {
  const [firstCard, ...remainingCards] = player.cards.sort();
  let previous = firstCard;
  for (let card of remainingCards) {
    if (previous + 1 !== card) {
    }
  }
  return 0;
};

export const findStartingChipCount = (playerCount: number): number => {
  if (playerCount < 3) {
    throw new Error("Minimum three players to play");
  } else if (playerCount <= 5) {
    return 11;
  } else if (playerCount === 6) {
    return 9;
  } else if (playerCount === 7) {
    return 7;
  } else {
    throw new Error("Maximum 7 players");
  }
};

export const generateWholeDeck = (): Card[] => {
  return Array.from(Array(33).keys()).map((n) => n + 3) as Card[];
};

export const generateCutDeck = (): Card[] => {
  const wholeDeck: Card[] = generateWholeDeck();
  const shuffledDeck = shuffle(wholeDeck);
  // 9 cards put back in the box
  const cutDeck = shuffledDeck.slice(0, -9);
  return cutDeck;
};
