import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../auth/context/useAuth";
import { HabitsContext } from "./types";
import { Habit } from "../../types/habit";
import { habitsService } from "../service/service";
import { UpdatedHabit } from "../service/types";

interface HabitsProviderProps {
  children: React.ReactNode;
}

export const HabitsProvider: React.FC<HabitsProviderProps> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, userId } = useAuth();

  const getHabits = useCallback(
    async (silent = false) => {
      try {
        if (!isAuthenticated || !userId) {
          throw new Error("User is not authenticated");
        }
        if (!silent) setIsLoading(true);
        const response = await habitsService.getHabits(
          userId,
          new Date().toISOString(),
        );

        setHabits(response.habits);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        if (!silent) setIsLoading(false);
      }
    },
    [isAuthenticated, userId],
  );

  useEffect(() => {
    if (isAuthenticated && userId) {
      getHabits();
    }
  }, [getHabits, isAuthenticated, userId]);

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
      await getHabits(true);
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

      getHabits(true).catch(); // silently catch the error

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
