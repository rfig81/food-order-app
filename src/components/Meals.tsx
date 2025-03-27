import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import { Meal } from "../types";
import Error from "./Error";

export default function Meals() {
  const { isLoading, data, error } = useHttp<Meal[]>({
    url: "meals",
    initialData: [],
  });

  if (isLoading) return <p className="center">Getting meals...</p>;
  if (error) {
    return <Error title="Failed to fetch meals" message={error.message} />;
  }

  return (
    <ul id="meals">
      {data.map((item) => (
        <MealItem key={item.id} {...item} />
      ))}
    </ul>
  );
}
