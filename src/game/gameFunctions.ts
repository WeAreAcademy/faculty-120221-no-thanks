import { NoThanksGame, PlayerName, Player, ScoredPlayer, Card, Action } from "./types";

import { makeNewDeck } from "./deckFunctions";
import { initial } from "lodash";
export function initialiseGame(playerNames: PlayerName): NoThanksGame {

  const toPlayer = (name: PlayerName): Player => {
    return { name, cards: [], chips: 0 };
  }

  return {
    players: [...playerNames].map(toPlayer),
    deck: makeNewDeck(),
    active: { playerIdx: 0, chips: 0 }
  };
}

export function validActions(game: NoThanksGame): Action[] {
  const choices = [];
  if (game.active.card) {
    choices.push(Action.TakeCard)
  }
  if (game.active.card && game.players[game.active.playerIdx].chips > 0) {
    choices.push(Action.PutChip);
  }
  return choices;
}
//TODO: Consider making a new state instead of mutating the given one.
export function applyAction(game: NoThanksGame, action: Action): NoThanksGame {
  const initiallyActivePlayer = game.players[game.active.playerIdx];

  if (action === Action.TakeCard) {
    //TODO: improve types so that it'll never typecheck to TakeCard from an empty deck/
    if (!game.active.card) {
      throw new Error("can't take card - no active card!");
    }

    initiallyActivePlayer.cards.push(game.active.card);
    initiallyActivePlayer.chips += game.active.chips;
    game.active.card = game.deck.length > 0 ? game.deck.shift() : undefined;
    game.active.chips = 0;

  } else if (action === Action.PutChip) {
    if (initiallyActivePlayer.chips <= 0) {
      throw new Error("active player has no chips - can't put chip!")
    }
    initiallyActivePlayer.chips--;
    game.active.chips++;
    game.active.playerIdx = (game.active.playerIdx + 1) % game.players.length;
  }
  return game;
}

export function currentPlayer(game: NoThanksGame): Player {
  const ix = game.active.playerIdx;
  const p = game.players[ix];
  console.assert(p !== undefined, "active player ix is out of bounds: " + ix);
  return p;
}

export function scoreCards(cardsOrig: Card[]): number {
  // groupBy takeWhile (card => card === current+1 ) cardsOrig

  if (cardsOrig.length === 0) {
    return 0;
  }

  const sortedCards = [...cardsOrig].sort();

  const groupings = [];
  let currentGroup = [sortedCards[0]];

  for (let val of sortedCards.slice(1)) {

    const prevVal = currentGroup[currentGroup.length - 1];

    if (val === prevVal + 1) {
      currentGroup.push(val);
    } else {
      groupings.push(currentGroup);
      currentGroup = [val];
    }
  }
  if (currentGroup.length > 0) {
    groupings.push(currentGroup);
  }

  return sum(groupings.map((g) => g[0]));
}

export function scorePlayer({ cards, chips }: Player): number {
  return chips - scoreCards(cards);
}

export function scoreGame(game: NoThanksGame): ScoredPlayer[] {
  //TODO: sort by score
  return game.players.map(p => [p, scorePlayer(p)]);
}

export function sum(ns: number[]): number {
  return ns.reduce((tot, val) => tot + val, 0);
}
