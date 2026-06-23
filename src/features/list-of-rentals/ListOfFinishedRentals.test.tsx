import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { ListOfFinishedRentals } from "./ListOfFinishedRentals";
import { text } from "../../localization/eng";
import { CarTypes } from "../../models/enums/carTypes";
import { RentalInformation } from "../../models/types/store/carState";

describe("ListOfFinishedRentals", () => {
  test("display empty list message", () => {
    const mockDispatch = vi.fn();
    renderWithProviders(<ListOfFinishedRentals />, {}, mockDispatch);

    expect(
      screen.getByText(text.listOfFinishedRentals.noFinishedRentals),
    ).toBeInTheDocument();
  });

  test("should have 2 list items", () => {
    const mockDispatch = vi.fn();
    const finishedRents = [
      {
        rentalId: "rental-1",
        registrationNumber: "ABC123",
        socialSecurityNumber: "1234567890",
        carCategory: CarTypes.SmallCar,
        startDate: "2026-06-23",
        meterreadingStart: 12000,
      },
      {
        rentalId: "rental-2",
        registrationNumber: "DEF456",
        socialSecurityNumber: "9876543210",
        carCategory: CarTypes.Combi,
        startDate: "2026-06-20",
        meterreadingStart: 15000,
      },
    ] as unknown as RentalInformation[];

    const { container } = renderWithProviders(
      <ListOfFinishedRentals />,
      {},
      mockDispatch,
      { activeRentals: [], finishedRents },
    );

    const listItems = container.querySelectorAll(".rental-list > .rental-item");
    expect(listItems).toHaveLength(2);
  });
});
