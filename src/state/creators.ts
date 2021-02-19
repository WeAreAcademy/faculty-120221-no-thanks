import { Action, bundle } from "riduce";
import { selectors } from ".";
import { actions } from "./reducer";
import { Card, NoThanksActiveArea, NoThanksGameState, Player } from "./types";
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
      console.warn("Not flipping a card since one is already active");
      return treeState;
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

export const playNoThanks = (state: NoThanksGameState): Action => {
  const playerChips = selectors.getActivePlayerChips(state);
  if (typeof playerChips === "undefined" || playerChips < 1) {
    window.alert("Can't do that - you have no chips");
    return actions.create.noop();
  }

  const activeIndex = selectors.getActivePlayerIndex(state);

  return bundle([
    actions.players[activeIndex!].chips.create.increment(-1),
    actions.active.chips.create.increment(),
    progressActivePlayer(),
  ]);
};

export const playTakeCard = ({
  playerIndex,
  card,
  chips,
}: NoThanksActiveArea): Action => {
  return bundle([
    actions.players[playerIndex!].cards.create.push(card!),
    actions.players[playerIndex!].chips.create.increment(chips ?? 0),
    actions.active.card.create.update(undefined),
    actions.active.chips.create.update(0),
    flipFromDeck(),
  ]);
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
  return bundle([
    formInitialDeck(),
    dealChips(),
    progressActivePlayer(),
    flipFromDeck(),
  ]);
};
