import { Habit } from "../../types/habit";

export type GetHabitsResponse = {
  habits: Habit[];
};

export type UpdatedHabit = {
  id: string;
  priority?: number;
  name?: string;
};
