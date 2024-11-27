import { apiClient } from "../../services/api/client";
import {
  GetHabitsResponse,
  ProgressSummaryResponse,
  UpdatedHabit,
} from "./types";

const LOG_PREFIX = "[HABITS_SERVICE]";

export const habitsService = {
  getHabits: async (
    userId: string,
    date: string,
  ): Promise<GetHabitsResponse> => {
    try {
      console.log("getHabits");
      const response = await apiClient.get<GetHabitsResponse>(
        `/habits/${userId}`,
        {
          params: {
            date,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(LOG_PREFIX, "getHabits failed:", error);
      throw error;
    }
  },

  createHabit: async (userId: string, name: string): Promise<string> => {
    try {
      const response = await apiClient.post<string>("/habits", {
        name,
        userId,
      });
      return response.data;
    } catch (error) {
      console.error(LOG_PREFIX + "Error creating habit:", error);
      throw error;
    }
  },

  updateHabits: async (
    userId: string,
    updatedHabits: UpdatedHabit[],
  ): Promise<string> => {
    try {
      const response = await apiClient.put<string>(`/habits/${userId}`, {
        habits: updatedHabits,
      });

      return response.data;
    } catch (error) {
      console.error(LOG_PREFIX + "Error updating habits:", error);
      throw error;
    }
  },

  toggleHabit: async (
    userId: string,
    habitId: string,
    isDone: boolean,
    date: string,
  ): Promise<string> => {
    try {
      const response = await apiClient.post(
        `/habits/${userId}/${habitId}/toggle`,
        {
          isDone,
          date,
        },
      );

      return response.data;
    } catch (error) {
      console.error(LOG_PREFIX + "Error updating habit:", error);
      throw error;
    }
  },

  deleteHabit: async (id: string): Promise<string> => {
    try {
      const response = await apiClient.delete(`/habits/${id}`);

      return response.data;
    } catch (error) {
      console.error(LOG_PREFIX + "Error deleting habit:", error);
      throw error;
    }
  },

  getProgressSummary: async (
    userId: string,
    numOfDays = 30,
  ): Promise<ProgressSummaryResponse> => {
    try {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(new Date().getDate() - numOfDays);

      const response = await apiClient.get<ProgressSummaryResponse>(
        `/habits/${userId}/summary`,
        {
          params: {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(LOG_PREFIX + "Error getting week progress summary:", error);
      throw error;
    }
  },
};
