import { useContext } from "react";
import UserProgressContext from "../store/UserProgressContext";

const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error(
      "useUserProgress must be used within a UserProgressContextProvider"
    );
  }
  return context;
};

export default useUserProgress;
