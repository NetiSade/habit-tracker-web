import { useContext } from "react";
import { HabitsContext } from "./types";

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits must be used within an HabitsProvider");
  }
  return context;
};
