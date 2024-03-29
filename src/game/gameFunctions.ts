import { NoThanksGame, PlayerName, Player, ScoredPlayer } from "./types";

export function initialiseGame(playerNames: PlayerName): NoThanksGame {
  return;
}

export function currentPlayer(game: NoThanksGame): Player {
  const ix = game.active.playerIdx;
  const p = game.players[ix];
  console.assert(p !== undefined, "active player ix is out of bounds: " + ix);
  return p;
}
export function scoreCards(cardsOrig: Card[]): number {
  // groupBy takeWhile (card => card === current+1 )

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
      currentGroup = [];
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
  return [];
}

export function sum(ns: number[]): number {
  function reducer(acc: number, val: number): number {
    console.log({ acc, val });
    return acc + val;
  }
  return ns.reduce((tot, val) => tot + val, 0);
}
