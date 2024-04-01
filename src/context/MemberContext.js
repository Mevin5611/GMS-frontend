import { createContext, useReducer } from "react";

export const MemberContext = createContext();

export const memberReducer = (state, action) => {
  switch (action.type) {
    case "SET_MEMBER":
      return {
        members: action.payload,
      };
    case "CREATE_MEMBER":
      return {
        members: [action.payload, ...state.members],
      };
    case "DELETE_MEMBER":
      return {
        members: state.members.filter((m) => m._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const MemberContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(memberReducer, {
    members: null,
  });

  return (
    <MemberContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MemberContext.Provider>
  );
};
