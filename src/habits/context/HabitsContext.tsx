import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../auth/context/useAuth";
import { HabitsContext } from "./types";
import { Habit } from "../../types/habit";
import { habitsService } from "../service/service";
import { ProgressSummaryResponse, UpdatedHabit } from "../service/types";

interface HabitsProviderProps {
  children: React.ReactNode;
}

export const HabitsProvider: React.FC<HabitsProviderProps> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [progressSummary, setProgressSummary] =
    useState<ProgressSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, userId } = useAuth();

  const getHabits = useCallback(async () => {
    try {
      if (!isAuthenticated || !userId) {
        throw new Error("User is not authenticated");
      }

      const response = await habitsService.getHabits(
        userId,
        new Date().toISOString(),
      );

      setHabits(response.habits);
    } catch (error) {
      console.error("Error fetching habits:", error);
      throw error;
    }
  }, [isAuthenticated, userId]);

  const getProgressSummary = useCallback(async () => {
    try {
      if (!isAuthenticated || !userId) {
        throw new Error("User is not authenticated");
      }
      const response = await habitsService.getProgressSummary(userId);
      setProgressSummary(response);
    } catch (error) {
      console.error("Error fetching progress summary:", error);
      throw error;
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (isAuthenticated && userId) {
      setIsLoading(true);
      Promise.all([getHabits(), getProgressSummary()])
        .catch((e) =>
          console.error("Error fetching habits and progress summary:", e),
        )
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [getHabits, getProgressSummary, isAuthenticated, userId]);

  const createHabit = async (name: string) => {
    try {
      if (!isAuthenticated || !userId) {
        throw new Error("User is not authenticated");
      }
      await habitsService.createHabit(userId, name);
      await getHabits();
    } catch (error) {
      console.error("Error creating habit:", error);
      throw error;
    }
  };

  const updateHabits = async (updatedHabits: UpdatedHabit[]) => {
    try {
      if (!isAuthenticated || !userId) {
        throw new Error("User is not authenticated");
      }
      await habitsService.updateHabits(userId, updatedHabits);
      await getHabits();
    } catch (error) {
      console.error("Error updating habits:", error);
      throw error;
    }
  };

  const toggleHabit = async (habitId: string, isDone: boolean) => {
    try {
      if (!isAuthenticated || !userId) {
        throw new Error("User is not authenticated");
      }

      const response = await habitsService.toggleHabit(
        userId,
        habitId,
        isDone,
        new Date().toISOString(),
      );

      // Optimistically update the habit
      const updatedHabits = habits.map((habit) => {
        if (habit.id === habitId) {
          return { ...habit, isDone };
        }
        return habit;
      });

      setHabits(updatedHabits);

      getHabits().catch(); // silently catch the error

      return response;
    } catch (error) {
      console.error("Error toggling habit:", error);
      throw error;
    }
  };

  const deleteHabit = async (habitId: string) => {
    try {
      if (!isAuthenticated || !userId) {
        throw new Error("User is not authenticated");
      }

      const response = await habitsService.deleteHabit(habitId);
      return response;
    } catch (error) {
      console.error("Error deleting habit:", error);
      throw error;
    }
  };

  return (
    <HabitsContext.Provider
      value={{
        habits,
        progressSummary,
        isLoading,
        getHabits,
        createHabit,
        updateHabits,
        toggleHabit,
        deleteHabit,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};
