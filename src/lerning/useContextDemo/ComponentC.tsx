import { useContext } from "react";
import { UserContext } from "./UserContext";

const ComponentC = () => {
  const user = useContext(UserContext);

  return (
    <div className="box">
      <h1>Component C - user: {user}</h1>
    </div>
  );
};

export default ComponentC;
