import React from "react";
import { Card } from "../game/types";

interface Props {
  value: Card;
}

export default function GameCard({ value }: Props) {
  return (
    <div className="card-container">
      <div className="card">
        <span className="card-value">{value}</span>
      </div>
    </div>
  );
}
