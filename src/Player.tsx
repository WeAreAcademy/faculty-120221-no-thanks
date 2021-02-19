import React from "react";
import classnames from "classnames";
import GameCard from "./components/GameCard";
import { groupCards, scoreCards } from "./game/gameFunctions";
import { Card, PlayerName } from "./game/types";

interface PlayerProps {
  chips: number;
  cards: Card[];
  name: PlayerName;
  active: boolean;
}

function pluralise(word: string, count: number): string {
  return count === 1 ? word : word + "s";
}

export function Player({ name, chips, cards, active }: PlayerProps) {
  const chipsPhrase = `${chips} ${pluralise("chip", chips)}`;
  return (
    <div className={classnames("player", { active })}>
      {active ? "It's your turn, " : ""}{" "}
      <span className="player-name">{name}</span>. You have {chipsPhrase}.
      <GameCardHand cards={cards} />
      <div className="running-score">Card score: {scoreCards(cards)}</div>
    </div>
  );
}

function GameCardHand({ cards }: GameCardHandProps) {
  return (
    <div className="card-hand">
      {groupCards(cards).map((grp, ix) => (
        <GameCardRun key={ix} cards={grp} />
      ))}
    </div>
  );
}
interface GameCardHandProps {
  cards: Card[];
}
interface GameCardRunProps {
  cards: Card[];
}

function GameCardRun({ cards }: GameCardRunProps) {
  return (
    <div className="card-run" title={tooltipForCardGroup(cards)}>
      {cards.map((c: Card) => (
        <GameCard key={c} value={c} />
      ))}
    </div>
  );
}

function costForRun(cards: Card[]): number {
  return cards[0];
}

function tooltipForCardGroup(cards: Card[]): string {
  const nounPhrase =
    cards.length === 1 ? "card" : `group of ${cards.length} cards`;
  return `This ${nounPhrase} will score ${costForRun(cards)} against you.`;
}
