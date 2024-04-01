import { createContext, useReducer } from "react";

export const PackageContext = createContext();

export const packageReducer = (state, action) => {
  switch (action.type) {
    case "SET_PACKAGE":
      return {
        packages: action.payload,
      };
    case "CREATE_PACKAGE":
      return {
        packages: [action.payload, ...state.packages],
      };
    case "DELETE_PACKAGE":
      return {
        packages: state.packages.filter((p) => p._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const PackageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(packageReducer, {
    packages: null,
  });

  return (
    <PackageContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PackageContext.Provider>
  );
};
