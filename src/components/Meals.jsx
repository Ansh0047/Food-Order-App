import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";

const configObject = {};

export default function Meals() {
  // {url, config}   // here it is get request so no config(empty) and initialData
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", configObject, []);

  // console.log(meals);

  if(isLoading){
    return <p>Fetching meals....</p>
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
