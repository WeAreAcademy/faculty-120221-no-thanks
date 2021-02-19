import React from "react";
import { Card } from "../game/types";

interface Props {
  value: Card;
  chipsOn?: number;
}

export default function GameCard({ value, chipsOn }: Props) {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-value">{value}</div>
        {chipsOn ?? <div className="card-chips-count">{chipsOn}</div>}
      </div>
    </div>
  );
}
