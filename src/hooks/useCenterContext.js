import { CenterContext } from "../context/CenterContext";
import { useContext } from "react";

export const useCenterContext = () => {
  const context = useContext(CenterContext);

  if (!context) {
    throw Error(
      "useCenterContext must be used inside  an CenterContextProvider"
    );
  }
  return context;
};
