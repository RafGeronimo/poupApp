import { useContext } from "react";
import { MainContext } from "../../contexts/MainContext";

const useMainContext = () => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("Main context not found!");
  }

  return context;
};

export default useMainContext;
