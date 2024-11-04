export const persistService = {
  setUserId: (userId: string) => {
    localStorage.setItem("userId", userId);
  },
  getUserId: () => {
    return localStorage.getItem("userId");
  },
  clearAll: () => {
    localStorage.clear();
  },
};
