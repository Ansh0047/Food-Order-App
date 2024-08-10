import { useState, useEffect } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [availableMeals, setAvailableMeals] = useState([]);
  //   to avoid the loop we have used the useEffect
  useEffect(() => {
    // to get the data from the backend
    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch the meals");
        }
        const resData = await response.json();
        setAvailableMeals(resData);
        // console.log(resData);
      } catch (error) {
        // handle the error
      }
    }
    fetchMeals();
  }, []); // no dependency as there is no state change

  return (
    <ul id="meals">
      {availableMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
