import Modal from "./Modal";
import useCart from "../hooks/useCart";
import { currencyFormatter } from "../helpers/formatting";
import Button from "./Button";
import useUserProgress from "../hooks/useUserProgress";
import Input from "./Input";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

type Customer = {
  name: string;
  email: string;
  street: string;
  postalCode: string;
  city: string;
};

export default function Checkout() {
  const { progress, hideCheckout } = useUserProgress();
  const { items, total, clearCart } = useCart();

  const {
    isLoading: isSendingRequest,
    sendRequest,
    data,
    error,
    clearData,
  } = useHttp({
    url: "orders",
    config: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    initialData: null,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fd = new FormData(event.target as HTMLFormElement);
    const customer = Object.fromEntries(fd.entries()) as Customer;

    sendRequest(JSON.stringify({ order: { items, customer } }));
  }

  function completeOrder() {
    clearCart();
    hideCheckout();
    clearData();
  }

  const isModalOpened = progress === "checkout";
  let actions = (
    <>
      <Button type="button" onClick={hideCheckout} textOnly>
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (isSendingRequest) actions = <span>Sending order data...</span>;

  if (data && !error) {
    return (
      <Modal open={isModalOpened} onClose={completeOrder}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={completeOrder}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal className="checkout" open={isModalOpened} onClose={hideCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p className="cart-total">
          Total amount: {currencyFormatter.format(total)}
        </p>

        <Input id="name" label="Full name" type="text" required />
        <Input id="email" label="E-mail Address" type="email" required />
        <Input id="street" label="Street" type="text" required />
        <div className="control-row">
          <Input id="postal-code" label="Postal Code" type="text" required />
          <Input id="city" label="City" type="text" required />
        </div>

        {error && (
          <Error title="Failed to submit order" message={error.message} />
        )}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
