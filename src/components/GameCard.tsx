import React from "react";
import classnames from "classnames";
import { Card } from "../game/types";

import { animated, useSpring, interpolate } from "react-spring";

interface Props {
  value: Card;
}
interface CardInPlayProps {
  value: Card;
  chipsOn: number;
}

export default function GameCard({ value }: Props) {
  //TODO: make a fade in of the new-arriving card, ONLY.
  //(Other cards currently get replaced in the DOM due to grouping, i think)
  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div className="card-container" style={springProps}>
      <div className="card">
        <div className="card-value">{value}</div>
      </div>
    </animated.div>
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
