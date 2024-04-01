import { createContext, useReducer } from "react";

export const TrainerContext = createContext();

export const trainerReducer = (state, action) => {
  switch (action.type) {
    case "SET_TRAINER":
      return {
        trainers: action.payload,
      };
    case "CREATE_TRAINER":
      return {
        trainers: [action.payload, ...state.trainers],
      };
    case "DELETE_TRAINER":
      return {
        trainers: state.trainers.filter((t) => t._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TrainerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trainerReducer, {
    trainers: null,
  });

  return (
    <TrainerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TrainerContext.Provider>
  );
};
