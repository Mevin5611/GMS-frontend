import { createContext, useReducer } from "react";

export const CenterContext = createContext();

export const CenterReducer = (state, action) => {
  switch (action.type) {
    case "SET_CENTER":
      return {
        centers: action.payload,
      };
      case "CREATE_CENTER":
      return {
        centers: [action.payload, ...state.centers],
      };
    case "DELETE_CENTER":
      return {
        centers: state.centers.filter((c) => c._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const CenterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CenterReducer, {
    centers: null,
  });

  return (
    <CenterContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CenterContext.Provider>
  );
};
