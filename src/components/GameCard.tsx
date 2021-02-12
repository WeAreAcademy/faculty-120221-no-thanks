import React from "react";
import styled from "styled-components";
import { Card } from "../game/types";
import CardFrame from "./atoms/CardFrame";

interface Props {
  value: Card;
}

const CardFront = styled(CardFrame)`
  justify-content: space-between;
  align-content: space-between;
`;

export default function GameCard({ value }: Props) {
  return (
    <CardFrame>
      <div>
        <span>{value}</span>
      </div>
    </CardFrame>
  );
}
