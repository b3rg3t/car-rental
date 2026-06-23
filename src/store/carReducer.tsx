import { CarActions } from "../models/enums/store/carActions";
import { ActionType } from "../models/types/store/actionType";
import { CarState } from "../models/types/store/carState";

export const carReducer = (state: CarState, action: ActionType): CarState => {
  switch (action.type) {
    case CarActions.REGISTER_RENTAL:
      return {
        ...state,
        activeRentals: [action.payload, ...state.activeRentals],
      };
    case CarActions.UPDATE_RENTAL:
      const activeCar = state.activeRentals.find(
        (rental) => rental.rentalId === action.payload.rentalId,
      );

      if (activeCar) {
        return {
          ...state,
          activeRentals: state.activeRentals.filter(
            (rental) => rental.rentalId !== action.payload.rentalId,
          ),
          finishedRents: [
            { ...activeCar, ...action.payload },
            ...state.finishedRents,
          ],
        };
      }
      return state;

    default:
      return state;
  }
};
