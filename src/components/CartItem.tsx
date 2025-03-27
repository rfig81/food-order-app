import { currencyFormatter } from "../helpers/formatting";

export default function CartItem({
  item,
  onDecrease,
  onIncrease,
}: {
  item: { id: string; name: string; price: number; quantity: number };
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  const { name, quantity, price } = item;

  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
