import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWOrkoutContext";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutContext();
  const logout = () => {
    //remove user from storage
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    workoutDispatch({ type: "SET_WORKOUT", payload: null });
  };
  return { logout };
};
