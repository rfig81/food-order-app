import logo from "../assets/logo.jpg";
import useCart from "../hooks/useCart";
import useUserProgress from "../hooks/useUserProgress";
import Button from "./Button";

export default function Header() {
  const { items } = useCart();
  const { showCart } = useUserProgress();

  const totalCartItems = items.reduce((acc, item) => {
    return acc + item.quantity!;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={showCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
