import { Action, bundle } from "riduce";
import { selectors } from ".";
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

export const dealChips = (): Action => {
  return actions.players.create.dealStartingChips();
};

export const flipFromDeck = (): Action => {
  return actions.create.do((treeState) => {
    if (treeState.active.card) {
      throw new Error("Can't flip card when there is already an active card");
    }

    const [topCard, ...remainingCards] = treeState.deck;
    return {
      ...treeState,
      deck: remainingCards,
      active: {
        ...treeState.active,
        card: topCard,
      },
    };
  });
};

export const formInitialDeck = (): Action => {
  const initialDeck = generateCutDeck();
  return actions.deck.create.update(initialDeck);
};

export const progressActivePlayer = (): Action => {
  return actions.active.playerIndex.create.do((currentPlayerIdx, treeState) => {
    // no active player -> start game with 0th player
    if (currentPlayerIdx === undefined) return 0;

    const incrementedIndex = currentPlayerIdx + 1;
    return incrementedIndex >= selectors.getPlayerCount(treeState)
      ? 0
      : incrementedIndex;
  });
};

export const startGame = (): Action => {
  return bundle([dealChips(), progressActivePlayer(), flipFromDeck()]);
};
