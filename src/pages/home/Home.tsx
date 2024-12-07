import { useState } from "react";

import { useHabits } from "../../habits/context/useHabits";
import NewHabitModal from "../../components/modals/NewHabitModal";
import { CheckboxItem, CheckboxList } from "../../components/checkboxList";
import {
  getFormattedCurrentDate,
  getRandomEncouragementMessage,
} from "./utils";
import EncouragementSection from "./EncouragementSection";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, SquarePlus } from "lucide-react";

const HomePage = () => {
  const {
    habits,
    isLoading,
    getHabits,
    toggleHabit,
    createHabit,
    updateHabits,
    deleteHabit,
  } = useHabits();

  const [isNewHabitModalOpen, setIsNewHabitModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const todayDate = getFormattedCurrentDate();
  const navigate = useNavigate();

  const tryToggleHabit = async (habitId: string, isChecked: boolean) => {
    try {
      await toggleHabit(habitId, isChecked);
    } catch (error) {
      console.error("Error toggling habit:", error);
    }
  };

  const handleReorder = async (items: CheckboxItem[]) => {
    const updatedHabits = items.map((item, index) => ({
      id: item.id,
      priority: index + 1,
    }));
    updateHabits(updatedHabits).catch(); // silently catch the error
  };

  const handleEditHabit = async (item: CheckboxItem) => {
    try {
      await updateHabits([{ id: item.id, name: item.label }]);
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  const handleRemoveHabit = async (habitId: string) => {
    try {
      await deleteHabit(habitId);
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const handleCreateHabit = async (habitName: string) => {
    try {
      await createHabit(habitName);
      // refetch habits to update the UI
      await getHabits();
    } catch (error) {
      console.error("Error creating habit:", error);
    }
  };

  const allHabitsCompleted =
    habits.length > 0 && habits.every((habit) => habit.isCompleted);

  const checkboxItems = habits.map(({ id, isCompleted, name }) => ({
    id,
    label: name,
    checked: isCompleted,
  }));

  const encouragementMessage = allHabitsCompleted
    ? getRandomEncouragementMessage()
    : null;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-600">
          Loading habits...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
            Your Habit Tracker
          </h1>
          <p className="text-xl text-gray-600">
            Track and improve your daily habits
          </p>
        </header>

        <div className="rounded-lg bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <div className="">
              <h2 className="text-2xl font-bold text-gray-800">
                Today's Habits
              </h2>
              <h2 className="animate-fade-in text-lg text-gray-800">
                {allHabitsCompleted ? `✅ ${todayDate}` : `🗓️ ${todayDate}`}
              </h2>
            </div>
            <div>
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className="rounded p-2 hover:bg-gray-100"
              >
                {isEditMode ? "Done" : "Edit"}
              </button>
            </div>
          </div>

          {habits.length === 0 ? (
            <div className="text-center italic text-gray-500">
              No habits to track. Add a new habit to get started!
            </div>
          ) : (
            <CheckboxList
              items={checkboxItems}
              onItemChange={tryToggleHabit}
              isEditMode={isEditMode}
              onReorder={handleReorder}
              onEdit={handleEditHabit}
              onRemove={handleRemoveHabit}
            />
          )}
        </div>

        {allHabitsCompleted && (
          <EncouragementSection encouragementMessage={encouragementMessage} />
        )}

        <div>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="mb-8 flex w-80 items-center justify-center gap-2 rounded-lg bg-amber-600 px-6 py-3 text-white transition-colors hover:bg-amber-700"
            >
              <LayoutDashboard />
              Dashboard
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setIsNewHabitModalOpen(true)}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              <SquarePlus />
            </button>
          </div>
        </div>
        <NewHabitModal
          isOpen={isNewHabitModalOpen}
          onClose={() => setIsNewHabitModalOpen(false)}
          onCreateHabit={handleCreateHabit}
        />
      </div>
    </div>
  );
};

export default HomePage;
