import { makeNewDeck } from "./deckFunctions";
import { NoThanksGame, PlayerName, Player, ScoredPlayer, Card, ActiveGame } from "./types";

export function takeCard(game: NoThanksGame): NoThanksGame {
  const { players, active } = game
  const newPlayers = [...players]
  const { playerIdx } = active
  if (active.card === undefined) { throw new TypeError("active card is undefined") }
  // player gains card
  const newCards = [...newPlayers[playerIdx].cards]
  newCards.push(active.card)
  // player gains chips
  const newChips = newPlayers[playerIdx].chips + active.chips
  newPlayers[active.playerIdx] = { ...newPlayers[active.playerIdx], cards: newCards, chips: newChips }
  // active chips goes to zero
  const newActive = { ...active, chips: 0 }
  const gameTwo = { ...game, players: newPlayers, active: newActive }
  // new card is flipped from deck
  const gameThree = flipCardFromDeck(gameTwo)
  // active player moves on
  const gameFour = progressActivePlayer(gameThree)
  return gameFour
}

export function playChip(game: NoThanksGame): NoThanksGame {
  // player whose turn it is looses a chip
  const { players, active } = game
  const newPlayers = [...players]
  const newChipsForPlayer = newPlayers[active.playerIdx].chips - 1
  newPlayers[active.playerIdx] = { ...newPlayers[active.playerIdx], chips: newChipsForPlayer }
  // active chips inceases by one
  const newChips = active.chips + 1
  const newActive = { ...active, chips: newChips }
  const newGame = { ...game, active: newActive, players: newPlayers }
  // active player moves on
  const gameTwo = progressActivePlayer(newGame)
  return gameTwo
}

export function getExamplePlayerNames(): PlayerName[] {
  return ["Esme", "Neill", "Richard"]
}
export function initialiseGame(playerNames: PlayerName[]): NoThanksGame {
  let players: Player[] = playerNames.map(name => { return { name, chips: 0, cards: [] } })
  players = dealChipsToPlayers(players)
  const deck: Card[] = makeNewDeck();
  const playerIdx: number = getIndexOfNextPlayer(players.length, undefined)
  const active: ActiveGame = { card: undefined, chips: 0, playerIdx }
  let game = { players, deck, active }
  game = flipCardFromDeck(game)
  return game;
}

export function flipCardFromDeck(game: NoThanksGame): NoThanksGame {
  if (game.active.card) {
    console.warn("Card already active")
    return game
  }
  else {
    const [topCard, ...cardsRemaining] = game.deck
    return { ...game, deck: cardsRemaining, active: { ...game.active, card: topCard } }
  }
}

export function dealChipsToPlayers(players: Player[]): Player[] {
  const startingChipCount = getStartingChipCount(players.length)
  return players.map(player => ({ ...player, chips: startingChipCount }))
}

export const getStartingChipCount = (numOfPlayers: number): number => {
  if (numOfPlayers < 3) {
    throw new Error("3 players minimum -> need more players");
  } else if (numOfPlayers <= 5) {
    return 11;
  } else if (numOfPlayers === 6) {
    return 9;
  } else if (numOfPlayers === 7) {
    return 7;
  } else {
    throw new Error("7 players max -> reduce the number of players");
  }
};

export function progressActivePlayer(game: NoThanksGame): NoThanksGame {
  const { players, deck, active } = game
  const numOfPlayers = players.length
  const lastActivePlayer = active.playerIdx
  const nextPlayer = getIndexOfNextPlayer(numOfPlayers, lastActivePlayer)
  const nextActive = { ...active }
  nextActive.playerIdx = nextPlayer
  return { players, deck, active: nextActive }
}

export function getIndexOfNextPlayer(numOfPlayers: number, lastActivePlayer: number | undefined): number {
  if (lastActivePlayer === undefined) return 0;
  else if (lastActivePlayer < numOfPlayers - 1) return lastActivePlayer + 1
  else return 0;
}

export function currentPlayer(game: NoThanksGame): Player {
  const ix = game.active.playerIdx;
  const p = game.players[ix];
  console.assert(p !== undefined, "active player ix is out of bounds: " + ix);
  return p;
}

function groupCards(sortedCards: Card[]): Card[][] {
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

function scoreGroups(groupings: Card[][]) {
  return groupings.map((g) => g[0])
}

export function scoreCards(cardsOrig: Card[]): number {
  // groupBy takeWhile (card => card === current+1 )

  if (cardsOrig.length === 0) {
    return 0;
  }

  const sortedCards = [...cardsOrig].sort();
  const groupings = groupCards(sortedCards)
  const groupScores = scoreGroups(groupings)

  return sum(groupScores);
}

export function scorePlayer({ cards, chips }: Player): number {
  return chips - scoreCards(cards);
}

export function scoreGame(game: NoThanksGame): ScoredPlayer[] {
  return game.players.map(player => [player, scorePlayer(player)]);
}

export function sum(ns: number[]): number {
  // function reducer(acc: number, val: number): number {
  //   console.log({ acc, val });
  //   return acc + val;
  // }
  return ns.reduce((tot, val) => tot + val, 0);
}
