import { createContext } from "react";
import { Habit } from "../../types/habit";
import { UpdatedHabit } from "../service/types";

export interface HabitsContextType {
  habits: Habit[];
  isLoading: boolean;
  getHabits: () => Promise<void>;
  createHabit: (name: string) => Promise<void>;
  updateHabits: (updatedHabits: UpdatedHabit[]) => Promise<void>;
  toggleHabit: (habitId: string, isDone: boolean) => Promise<string>;
  deleteHabit: (habitId: string) => Promise<string>;
}

export const HabitsContext = createContext<HabitsContextType | null>(null);
