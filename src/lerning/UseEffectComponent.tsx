import { useEffect, useState } from "react";

const UseEffectComponent = () => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("green");
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (count > 0) document.title = `Count: ${count} ${color}`;

    return () => {
      document.title = "React App";
    };
  }, [count, color]);

  return (
    <div>
      <h1>UseEffectComponent</h1>
      <p
        style={{
          color,
        }}
      >
        Count: {count}
      </p>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
      <br />
      <button
        onClick={() => setColor((c) => (c === "green" ? "red" : "green"))}
      >
        Change Color
      </button>
    </div>
  );
};
export default UseEffectComponent;
