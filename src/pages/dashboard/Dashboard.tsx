import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { useHabits } from "../../habits/context/useHabits";
import { TrendingUp, Flame, Award, Activity } from "lucide-react";

const HabitPerformanceDashboard = () => {
  const { progressSummary } = useHabits();

  // Process and analyze habit data
  const processedData = useMemo(() => {
    // Check if progressSummary is null or empty
    if (!progressSummary?.summary?.length) {
      return null;
    }

    // Sort data by date (most recent first)
    const sortedData = [...progressSummary.summary].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    // Calculate performance metrics
    const totalDays = sortedData.length;
    const completionRates = sortedData.map((day) => {
      return {
        date: day.date,
        completionRate: isNaN(
          day.completed_habits.length / day.total_habits.length,
        )
          ? 0
          : (day.completed_habits.length / day.total_habits.length) * 100,
        completedHabits: day.completed_habits,
        totalHabits: day.total_habits,
      };
    });

    // Overall performance
    const overallCompletionRate =
      completionRates.reduce((sum, day) => sum + day.completionRate, 0) /
      totalDays;

    // Streak calculation
    const calculateStreak = () => {
      let streak = 0;
      for (const day of sortedData) {
        if (day.completed_habits.length === day.total_habits.length) {
          streak++;
        } else {
          break;
        }
      }
      return streak;
    };

    return {
      completionRates,
      overallCompletionRate,
      streakDays: calculateStreak(),
    };
  }, [progressSummary?.summary]);

  // Empty state rendering
  if (!processedData) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center rounded-xl bg-gradient-to-br from-white to-blue-50 p-6 text-center shadow-2xl">
        <Activity className="mb-4 h-16 w-16 text-blue-400" />
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Your Habit Journey Begins
        </h2>
        <p className="mb-4 text-gray-600">
          Start tracking your habits to see your progress here!
        </p>
        <div className="max-w-md rounded-lg bg-blue-100 p-4">
          <p className="text-sm text-blue-800">
            💡 Tip: Complete your first habits to unlock insights about your
            performance.
          </p>
        </div>
      </div>
    );
  }

  // Motivational messages based on performance
  const getMotivationalMessage = () => {
    if (processedData.overallCompletionRate >= 90)
      return "🏆 Incredible! You're absolutely crushing your habits!";
    if (processedData.overallCompletionRate >= 75)
      return "🔥 Awesome progress! You're building amazing habits!";
    if (processedData.overallCompletionRate >= 50)
      return "👏 Great job! Keep pushing forward!";
    return "💪 Every small step counts. You've got this!";
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl bg-gradient-to-br from-white to-blue-50 p-6 shadow-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Habit Hero Journey
        </h2>
        <div className="text-sm italic text-gray-600">
          {getMotivationalMessage()}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Overall Performance Card */}
        <div className="transform rounded-lg bg-blue-100 p-4 shadow-md transition hover:scale-105">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">
              Overall Performance
            </h3>
            <TrendingUp className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {processedData.overallCompletionRate.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600">Average Daily Completion</p>
        </div>

        {/* Streak Card */}
        <div className="transform rounded-lg bg-green-100 p-4 shadow-md transition hover:scale-105">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">
              Current Streak
            </h3>
            <Flame className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">
            {processedData.streakDays} Days
          </p>
          <p className="text-sm text-gray-600">Perfect Completion</p>
        </div>

        {/* Daily Performance Breakdown */}
        <div className="transform rounded-lg bg-purple-100 p-4 shadow-md transition hover:scale-105">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">
              Daily Performance
            </h3>
            <Award className="text-purple-500" />
          </div>
          <div className="space-y-2">
            {processedData.completionRates.slice(0, 5).map((day) => (
              <div key={day.date} className="flex justify-between">
                <span className="text-sm text-gray-700">
                  {format(parseISO(day.date), "MMM d")}
                </span>
                <span className="text-sm font-medium text-gray-800">
                  {day.completionRate.toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Habit Performance Table */}
      <div className="mt-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Your Habit Highlight Reel
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse overflow-hidden rounded-lg bg-white shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left font-semibold text-gray-600">
                  Date
                </th>
                <th className="p-3 text-center font-semibold text-gray-600">
                  Completed
                </th>
                <th className="p-3 text-center font-semibold text-gray-600">
                  Completion Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {processedData.completionRates.slice(0, 14).map((day) => (
                <tr
                  key={day.date}
                  className="border-b transition hover:bg-blue-50"
                >
                  <td className="p-3 text-gray-800">
                    {format(parseISO(day.date), "MMM d, yyyy")}
                  </td>
                  <td className="p-3 text-center text-gray-700">
                    {day.completedHabits.length}
                  </td>
                  <td className="p-3 text-center font-medium text-blue-600">
                    {day.completionRate.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HabitPerformanceDashboard;
