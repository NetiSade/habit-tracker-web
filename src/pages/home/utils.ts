export const getFormattedCurrentDate = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

export const getRandomEncouragementMessage = () => {
  return encouragementMessages[
    Math.floor(Math.random() * encouragementMessages.length)
  ];
};
