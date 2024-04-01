import { PackageContext } from "../context/PackageContext";
import { useContext } from "react";

export const usePackageContext = () => {
  const context = useContext(PackageContext);

  if (!context) {
    throw Error(
      "usePackageContext must be used inside  an PackageContextProvider"
    );
  }
  return context;
};