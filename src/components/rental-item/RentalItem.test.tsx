import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { text } from "../../localization/eng";
import { formatDate } from "../../features/utils/formatDate";

vi.mock("../../features/return-of-car/ReturnOfCar", () => ({
  ReturnOfCar: () => <div data-testid="return-of-car" />,
}));

import { RentalItem } from "./RentalItem";
import { CarTypes } from "../../models/enums/carTypes";

const baseRental = {
  rentalId: "rental-1",
  registrationNumber: "ABC123",
  socialSecurityNumber: "1234567890",
  carCategory: CarTypes.SmallCar,
  startDate: "2026-06-23",
  meterreadingStart: 15000,
};

describe("RentalItem", () => {
  test("renders required rental fields", () => {
    render(<RentalItem rental={baseRental} />);

    expect(
      screen.getByText((content) =>
        content.includes(text.newRegistration.form.carCategory),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(text.newRegistration.form.registrationNumber),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(text.newRegistration.form.socialSecurityNumber),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(text.newRegistration.form.meterreadingStart),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(text.newRegistration.form.startTime),
      ),
    ).toBeInTheDocument();

    expect(screen.getByText(baseRental.carCategory)).toBeInTheDocument();
    expect(screen.getByText(baseRental.registrationNumber)).toBeInTheDocument();
    expect(
      screen.getByText(baseRental.socialSecurityNumber),
    ).toBeInTheDocument();
    expect(
      screen.getByText(baseRental.meterreadingStart.toString()),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatDate(baseRental.startDate)),
    ).toBeInTheDocument();
  });

  test("renders optional end date, meter reading end and price when provided", () => {
    const rentalWithExtras = {
      ...baseRental,
      meterreadingEnd: 15200,
      endDate: "2026-06-24",
      price: 4700,
    };

    render(<RentalItem rental={rentalWithExtras} />);

    expect(
      screen.getByText((content) =>
        content.includes(text.returnOfCar.form.meterreadingEnd),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(text.returnOfCar.form.endDate),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(rentalWithExtras.meterreadingEnd.toString()),
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatDate(rentalWithExtras.endDate)),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(rentalWithExtras.price.toString()),
      ),
    ).toBeInTheDocument();
  });

  test("renders ReturnOfCar when rental is active", () => {
    render(<RentalItem rental={baseRental} isActive />);

    expect(screen.getByTestId("return-of-car")).toBeInTheDocument();
  });

  test("does not render ReturnOfCar when rental is not active", () => {
    render(<RentalItem rental={baseRental} />);

    expect(screen.queryByTestId("return-of-car")).not.toBeInTheDocument();
  });
});
