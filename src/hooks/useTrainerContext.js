import {TrainerContext} from '../context/TrainerContext'
import { useContext } from "react";

export const useTrainerContext = () => {
  const context = useContext(TrainerContext);

  if (!context) {
    throw Error(
      "useTrainerContext must be used inside  an TrainerContextProvider"
    );
  }
  return context;
};
