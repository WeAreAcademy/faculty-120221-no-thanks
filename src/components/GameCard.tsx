import React from "react";
import { Card } from "../game/types";
import CardFrame from "./atoms/CardFrame";

interface Props {
  value: Card;
}

export default function GameCard({ value }: Props) {
  return (
    <CardFrame>
      <div>
        <span>{value}</span>
      </div>
    </CardFrame>
  );
}
