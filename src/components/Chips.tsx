interface Props {
  numberOfChips: number;
}

function Chips({ numberOfChips }: Props) {
  return <div>Chips: {numberOfChips}</div>;
}

export default Chips;
