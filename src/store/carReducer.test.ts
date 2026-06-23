import { carReducer } from "./carReducer";
import { calculatePrice } from "../features/utils/calculatePrice";
import { CarActions } from "../models/enums/store/carActions";
import { CarState } from "../models/types/store/carState";
import { CarTypes } from "../models/enums/carTypes";

const initialState: CarState = {
  activeRentals: [
    {
      rentalId: "abc-123",
      registrationNumber: "XYZ 123",
      socialSecurityNumber: "910101-1234",
      carCategory: CarTypes.Combi,
      startDate: "2026-06-23T09:00",
      meterreadingStart: 5000,
    },
  ],
  finishedRents: [],
};

describe("carReducer", () => {
  test("REGISTER_RENTAL adds a new active rental at the beginning", () => {
    const newRental = {
      rentalId: "def-456",
      registrationNumber: "ABC 456",
      socialSecurityNumber: "920202-5678",
      carCategory: CarTypes.Combi,
      startDate: "2026-06-24T10:00",
      meterreadingStart: 1000,
    };

    const nextState = carReducer(initialState, {
      type: CarActions.REGISTER_RENTAL,
      payload: newRental,
    });

    expect(nextState.activeRentals).toHaveLength(2);
    expect(nextState.activeRentals[0]).toEqual(newRental);
    expect(nextState.finishedRents).toEqual([]);
  });

  test("UPDATE_RENTAL moves an active rental to finishedRents with return data", () => {
    const returnPayload = {
      rentalId: "abc-123",
      endDate: "2026-06-25T12:00",
      meterreadingEnd: 5100,
    };

    const nextState = carReducer(initialState, {
      type: CarActions.UPDATE_RENTAL,
      payload: returnPayload,
    });

    expect(nextState.activeRentals).toHaveLength(0);
    expect(nextState.finishedRents).toHaveLength(1);
    expect(nextState.finishedRents[0]).toEqual({
      ...initialState.activeRentals[0],
      ...returnPayload,
      price: calculatePrice(
        initialState.activeRentals[0].startDate,
        returnPayload.endDate,
        initialState.activeRentals[0].carCategory,
        initialState.activeRentals[0].meterreadingStart,
        returnPayload.meterreadingEnd,
      ),
    });
  });

  test("UPDATE_RENTAL returns the same state when the rental is not found", () => {
    const nextState = carReducer(initialState, {
      type: CarActions.UPDATE_RENTAL,
      payload: {
        rentalId: "missing-999",
        endDate: "2026-06-26T12:00",
        meterreadingEnd: 5200,
      },
    });

    expect(nextState).toBe(initialState);
  });
});
