import { Habit } from "../../types/habit";

export type GetHabitsResponse = {
  habits: Habit[];
};

export type UpdatedHabit = {
  id: string;
  priority?: number;
  name?: string;
};

export type DateProgressSummary = {
  date: string;
  completed_habits: string[];
  total_habits: string[];
};

export type ProgressSummaryResponse = {
  summary: DateProgressSummary[];
};
