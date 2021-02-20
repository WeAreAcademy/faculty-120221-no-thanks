import React from "react";
import classnames from "classnames";
import { Card } from "../game/types";

interface Props {
  value: Card;
}
interface CardInPlayProps {
  value: Card;
  chipsOn: number;
}

export default function GameCard({ value }: Props) {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-value">{value}</div>
      </div>
    </div>
  );
}

export function CardInPlay({ value, chipsOn }: CardInPlayProps) {
  function pad(n: number): string {
    return "0" + (n < 10 ? "0" : "") + n;
  }
  function chipsImageFor(numChipsOn: number): string {
    return `/imgs/chips/chips-${pad(numChipsOn)}.png`;
  }
  return (
    <div
      className="card-in-play"
      style={{
        backgroundImage: `url("${chipsImageFor(chipsOn)}")`,
      }}
    >
      <div className="card-value">{value}</div>
      <div className="card-chips-count">{chipsOn} chips</div>
    </div>
  );
}
