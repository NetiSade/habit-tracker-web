import { useContext } from "react";

import ComponentC from "./ComponentC";
import { UserContext } from "./UserContext";

const ComponentB = () => {
  const user = useContext(UserContext);

  return (
    <div className="box">
      <h1>Component b - user: {user}</h1>
      <ComponentC />
    </div>
  );
};

export default ComponentB;
