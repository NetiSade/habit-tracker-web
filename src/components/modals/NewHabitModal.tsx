import React, { useState } from "react";

interface NewHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateHabit: (habitName: string) => Promise<void>;
}

const NewHabitModal: React.FC<NewHabitModalProps> = ({
  isOpen,
  onClose,
  onCreateHabit,
}) => {
  const [habitName, setHabitName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateHabit = async () => {
    // Validate input
    if (!habitName.trim()) {
      alert("Habit name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreateHabit(habitName.trim());
      // Reset form
      setHabitName("");
      onClose();
    } catch (error) {
      console.error("Failed to create habit:", error);
      alert("Failed to create habit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white shadow-xl">
        {/* Modal Header */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Create a New Habit
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Add a daily habit to track your progress
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <label
            htmlFor="habitName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Habit Name
          </label>
          <input
            id="habitName"
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="e.g., Read 30 minutes"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 border-t border-gray-200 p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreateHabit}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            disabled={isSubmitting || !habitName.trim()}
          >
            {isSubmitting ? "Creating..." : "Create Habit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewHabitModal;
