import { useState } from "react";

const ExpandedFoodList = () => {
  const [foods, setFoods] = useState(["Pizza", "Burger"]);

  const handleRemove = (index: number) => {
    setFoods((f) => f.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>My favorite foods</h1>
      <ul>
        {foods.map((food, index) => (
          <li
            key={index}
            onClick={() => handleRemove(index)}
            style={{
              cursor: "pointer",
            }}
          >
            {food}
          </li>
        ))}
      </ul>
      <input type="text" placeholder="Enter a new food" id="food-input" />
      <button
        onClick={() => {
          const newFood = (
            document.getElementById("food-input") as HTMLInputElement
          ).value;
          setFoods((f) => [...f, newFood]);
          (document.getElementById("food-input") as HTMLInputElement).value =
            "";
        }}
      >
        Add Food
      </button>
    </div>
  );
};
export default ExpandedFoodList;
