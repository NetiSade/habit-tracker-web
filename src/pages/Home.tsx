import { useState } from "react";
import CheckboxList, { CheckboxItem } from "../components/CheckboxList";
import { useHabits } from "../habits/context/useHabits";
import NewHabitModal from "../components/modals/NewHabitModal";

const HomePage = () => {
  const {
    habits,
    isLoading,
    toggleHabit,
    getHabits,
    createHabit,
    updateHabits,
    deleteHabit,
  } = useHabits();

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tryToggleHabit = async (habitId: string, isChecked: boolean) => {
    try {
      await toggleHabit(habitId, isChecked);
    } catch (error) {
      console.error("Error toggling habit:", error);
      getHabits().catch(); // silently catch the error
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
      getHabits().catch(); // silently catch the error
    }
  };

  const handleRemoveHabit = async (habitId: string) => {
    try {
      await deleteHabit(habitId);
    } catch (error) {
      console.error("Error deleting habit:", error);
      getHabits().catch(); // silently catch the error
    }
  };

  // Check if all habits are completed
  const allHabitsCompleted =
    habits.length > 0 && habits.every((habit) => habit.isCompleted);

  // Array of encouraging messages
  const encouragementMessages = [
    "You're crushing your goals today!",
    "Incredible job staying consistent!",
    "Every habit is a step towards a better you!",
    "Small wins lead to big transformations!",
    "You're building excellence, one habit at a time!",
    "Consistency is your superpower!",
    "Today's effort is tomorrow's success!",
  ];

  // Randomly select an encouraging message
  const encouragementMessage = allHabitsCompleted
    ? encouragementMessages[
        Math.floor(Math.random() * encouragementMessages.length)
      ]
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
              <h2 className="text-lg text-gray-800">
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
              items={habits.map(({ id, isCompleted, name }) => ({
                id,
                label: name,
                checked: isCompleted,
              }))}
              onItemChange={async (habitId, isChecked) => {
                await tryToggleHabit(habitId, isChecked);
              }}
              isEditMode={isEditMode}
              onReorder={handleReorder}
              onEdit={handleEditHabit}
              onRemove={handleRemoveHabit}
            />
          )}
        </div>

        {/* Encouragement Section */}
        {allHabitsCompleted && (
          <div className="animate-fade-in rounded-lg border-2 border-green-200 bg-green-50 p-6 text-center">
            <div className="mb-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mx-auto mb-4 h-12 w-12 animate-bounce text-green-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <p className="mb-2 text-2xl font-bold text-green-800">
              Congratulations!
            </p>
            <p className="text-xl text-green-700">{encouragementMessage}</p>
          </div>
        )}

        {/* New Habit Button and Modal */}
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            Add New Habit
          </button>

          <NewHabitModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreateHabit={async (habitName) => {
              try {
                await createHabit(habitName);
                // Optionally, you can add a toast notification here
              } catch (error) {
                console.error("Failed to create habit", error);
                // Handle error (maybe show an error toast)
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
