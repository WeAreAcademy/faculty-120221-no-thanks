import React from "react";
import Counter from "../atoms/Counter";

interface Props {
  n: number;
}

export default function Counters({ n }: Props) {
  return (
    <>
      {[...Array.from(Array(n).keys())].map((counterNumber) => (
        <Counter key={counterNumber} />
      ))}
    </>
  );
}
