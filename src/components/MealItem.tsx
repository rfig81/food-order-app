import { Meal } from "../types";
import useCart from "../hooks/useCart";
import { API_URL } from "../../config";
import { currencyFormatter } from "../helpers/formatting";
import Button from "./Button";

export default function MealItem({
  id,
  name,
  price,
  description,
  image,
}: Meal) {
  const { addItem } = useCart();

  function handleAddMealToCart() {
    addItem({ id, name, price });
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`${API_URL}/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(price)}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
