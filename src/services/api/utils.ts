export const getApiUrl = () => {
  if (import.meta.env.VITE_ENV === "development") {
    return "http://localhost:3000";
  }
  // production
  return import.meta.env.VITE_API_URL;
};
