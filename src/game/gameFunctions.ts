import { NoThanksGame, PlayerName, Player, ScoredPlayer, Card, Action, NumPlayers } from "./types";

import { makeNewDeck } from "./deckFunctions";


function isValidNumPlayers(n: number): n is NumPlayers {
  console.log(`checking if ${n} is valid num of players`)
  return [3, 4, 5, 6, 7].includes(n);
}

export function initialiseGame(playerNames: PlayerName[]): NoThanksGame {
  const numPlayers = playerNames.length;
  if (!isValidNumPlayers(numPlayers)) {
    //TODO: return error message - don't throw
    throw new Error("Invalid number of players");
  }

  const startingChips = numStartingChipsForNPlayers(numPlayers)
  const createPlayer = (name: PlayerName): Player => {
    return { name, cards: [], chips: startingChips };
  }

  const game: NoThanksGame = {
    players: [...playerNames].map(createPlayer),
    deck: makeNewDeck(),
    active: { playerIdx: 0, chips: 0 }
  };
  const firstCard = game.deck.pop()
  game.active.card = firstCard;
  return game;
}

function numStartingChipsForNPlayers(numPlayers: NumPlayers): number {
  const lookup: { [num: number]: number } = { 3: 11, 4: 11, 5: 11, 6: 9, 7: 7 };
  const startingChips = lookup[numPlayers];
  if (startingChips === undefined) {
    throw new Error("Number of players not found in lookup: " + numPlayers);
  }
  return startingChips;
}
export function makeRandomGame(): NoThanksGame {
  return randomiseGame(initialiseGame(["Larry", "Curly", "Mo"]))
}

export function randomiseGame(game: NoThanksGame): NoThanksGame {
  const numCardsToDistribute = Math.floor(game.deck.length / 2);
  // const game.deck.slice(0, numCardsToDistribute);
  for (let i = 0; i < numCardsToDistribute; i++) {
    //TODO: use API rather than manipulating deck and player directly
    const player = game.players[i % game.players.length];
    const card = game.deck.shift();
    if (card) {
      player.cards.push(card);
    }
  }

  for (let p of game.players) {
    p.chips = Math.floor(Math.random() * 20);
  }
  return game;
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
  debugger
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

export function sortCardsNoMutate(cardsOrig: Card[]): Card[] {
  return [...cardsOrig].sort((a, b) => a - b);
}
export function groupCards(cardsOrig: Card[]): Card[][] {
  if (cardsOrig.length === 0) {
    return [];
  }
  const sortedCards = sortCardsNoMutate(cardsOrig)

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
  return groupings;
}
export function scoreCards(cardsOrig: Card[]): number {
  // groupBy takeWhile (card => card === current+1 ) cardsOrig

  if (cardsOrig.length === 0) {
    return 0;
  }
  const groupings = groupCards(cardsOrig);
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
