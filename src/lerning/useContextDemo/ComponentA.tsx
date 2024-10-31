import { useRef, useState } from "react";
import ComponentB from "./ComponentB";
import { UserContext } from "./UserContext";

const ComponentA = () => {
  const [user, setUser] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="box">
      <h1>Hello {user}</h1>
      <input style={{ marginLeft: "10px" }} type="text" ref={inputRef} />
      <button
        onClick={() => {
          setUser(inputRef.current?.value || "");
        }}
        style={{ marginLeft: "10px", height: "30px" }}
      >
        Save User
      </button>
      <UserContext.Provider value={user}>
        <ComponentB />
      </UserContext.Provider>
    </div>
  );
};

export default ComponentA;
