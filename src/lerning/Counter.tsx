import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const buttonsProps = [
    {
      label: "Decrement",
      onClick: () => setCount((current) => current - 1),
    },
    {
      label: "Reset",
      onClick: () => setCount(0),
    },
    {
      label: "Increment",
      onClick: () => setCount((current) => current + 1),
    },
  ];

  return (
    <div className="counter-container">
      <p className="count-display">Count: {count}</p>

      {buttonsProps.map(({ label, onClick }, index) => (
        <button className="counter-button" key={index} onClick={onClick}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default Counter;
