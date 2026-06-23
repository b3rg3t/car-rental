import { createContext, Dispatch, useReducer } from "react";
import { CarState } from "../models/types/store/carState";
import { carReducer } from "./carReducer";
import { ActionType } from "../models/types/store/actionType";

const initialState: CarState = {
  activeRentals: [],
  finishedRents: [],
};

const CarContext = createContext<{
  state: CarState;
  dispatch: Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (state: CarState, action: ActionType) =>
  carReducer(state, action);

const CarProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <CarContext.Provider value={{ state, dispatch }}>
      {children}
    </CarContext.Provider>
  );
};

export { CarContext, CarProvider };
