import React from "react";
import classnames from "classnames";
import GameCard from "./components/GameCard";
import { groupCards, scoreCards } from "./game/gameFunctions";
import { Card, PlayerName } from "./game/types";
import { animated, useSpring, interpolate } from "react-spring";

interface PlayerProps {
  chips: number;
  cards: Card[];
  name: PlayerName;
  active: boolean;
  isGameOver: boolean;
}

function pluralise(word: string, count: number): string {
  return count === 1 ? word : word + "s";
}

export function Player({
  name,
  chips,
  cards,
  active,
  isGameOver,
}: PlayerProps) {
  const chipsPhrase = ` ${pluralise("chip", chips)}`;

  const springProps = useSpring<{
    score: number;
    chips: number;
    finalScore: number;
  }>({
    score: scoreCards(cards),
    chips,
    finalScore: scoreCards(cards) - chips,
    from: { score: 0, chips: 0 },
  });

  return (
    <div className={classnames("player", { active })}>
      {active ? "It's your turn, " : ""}{" "}
      <span className="player-name">{name}</span>. Your cards total to{" "}
      <animated.span className="running-score">
        {springProps.score.interpolate((v) => Math.round(v))}
      </animated.span>
      . You have{" "}
      <animated.span>
        {springProps.chips.interpolate((v) => Math.round(v))}
      </animated.span>
      {chipsPhrase}.
      {isGameOver && (
        <span>
          {" "}
          Your final score is{" "}
          <animated.span className="final-score">
            {springProps.finalScore.interpolate((v) => Math.round(v))}
          </animated.span>
          .
        </span>
      )}
      <GameCardHand cards={cards} />
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
