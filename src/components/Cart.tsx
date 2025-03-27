import Modal from "./Modal";
import useCart from "../hooks/useCart";
import { currencyFormatter } from "../helpers/formatting";
import Button from "./Button";
import useUserProgress from "../hooks/useUserProgress";
import CartItem from "./CartItem";

export default function Cart() {
  const { progress, hideCart, showCheckout } = useUserProgress();
  const { items, total, addItem, removeItem } = useCart();

  const isModalOpened = progress === "cart";

  return (
    <Modal
      className="cart"
      open={isModalOpened}
      onClose={isModalOpened ? hideCart : undefined}
    >
      <h2>Your cart!</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={{ ...item, quantity: item.quantity! }}
            onDecrease={() => removeItem(item.id)}
            onIncrease={() => addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(total)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={hideCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={showCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
