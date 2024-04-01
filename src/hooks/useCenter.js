import { CenterContext } from "../context/CenterContext";
import { useContext } from "react";

export const useCenterContext = () => {
  const context = useContext(CenterContext);

  if (!context) {
    throw Error(
      "usecenterContext must be used inside  an centerContextProvider"
    );
  }
  return context;
};
