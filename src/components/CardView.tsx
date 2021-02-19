import { Card } from "../state/types";

interface Props {
  numberOnCard: Card;
}

function CardView({ numberOnCard }: Props) {
  return <div className="card-view">{numberOnCard}</div>;
}

export default CardView;
