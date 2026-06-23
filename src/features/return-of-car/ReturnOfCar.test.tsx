import { screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { ReturnOfCar } from "./ReturnOfCar";
import { text } from "../../localization/eng";
import { CarActions } from "../../models/enums/store/carActions";
import { renderWithProviders } from "../../utils/test-utils";
import { formatString } from "../utils/formatString";

describe("ReturnOfCar", () => {
  test("toggles form visibility and cancel hides it", () => {
    const mockDispatch = vi.fn();

    renderWithProviders(
      <ReturnOfCar rentalId="rental-123" startDate="2024-01-02T09:00" meterreadingStart={100} />,
      {},
      mockDispatch,
    );

    const openButton = screen.getByRole("button", {
      name: text.returnOfCar.formButton,
    });
    expect(openButton).toBeInTheDocument();

    fireEvent.click(openButton);
    expect(screen.getByRole("heading", { name: text.returnOfCar.header })).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", {
      name: text.button.cancel,
    });
    fireEvent.click(cancelButton);

    expect(screen.getByRole("button", { name: text.returnOfCar.formButton })).toBeInTheDocument();
  });

  test("submits form and dispatches UPDATE_RENTAL with combined date/time and rentalId", async () => {
    const mockDispatch = vi.fn();

    renderWithProviders(
      <ReturnOfCar rentalId="rental-123" startDate="2024-01-02T09:00" meterreadingStart={100} />,
      {},
      mockDispatch,
    );

    fireEvent.click(screen.getByRole("button", { name: text.returnOfCar.formButton }));

    const dateInput = screen.getByLabelText(text.returnOfCar.form.endDate);
    const timeInput = screen.getByLabelText(text.returnOfCar.form.endTime);
    const meterInput = screen.getByLabelText(text.returnOfCar.form.meterreadingEnd);

    fireEvent.change(dateInput, { target: { value: "2024-01-02" } });
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    fireEvent.change(meterInput, { target: { value: "123" } });

    fireEvent.click(screen.getByRole("button", { name: text.button.submit }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: CarActions.UPDATE_RENTAL,
        payload: {
          meterreadingEnd: "123",
          endDate: "2024-01-02T12:00",
          rentalId: "rental-123",
        },
      });
    });
  });

  test("uses startDate as the minimum allowed endDate", async () => {
    const mockDispatch = vi.fn();

    renderWithProviders(
      <ReturnOfCar rentalId="rental-123" startDate="2024-01-02T09:00" meterreadingStart={100} />,
      {},
      mockDispatch,
    );

    fireEvent.click(screen.getByRole("button", { name: text.returnOfCar.formButton }));

    const dateInput = screen.getByLabelText(text.returnOfCar.form.endDate);
    expect(dateInput).toHaveAttribute("min", "2024-01-02");

    fireEvent.change(dateInput, { target: { value: "2024-01-01" } });
    fireEvent.click(screen.getByRole("button", { name: text.button.submit }));

    await waitFor(async () => {
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(await screen.findByText(formatString(text.validation.endDate, "2024-01-02"))).toBeInTheDocument();
    });
  });

  test("shows error when meterreadingEnd is not greater than start meter reading", async () => {
    const mockDispatch = vi.fn();

    renderWithProviders(
      <ReturnOfCar rentalId="rental-123" startDate="2024-01-02T09:00" meterreadingStart={100} />,
      {},
      mockDispatch,
    );

    fireEvent.click(screen.getByRole("button", { name: text.returnOfCar.formButton }));

    const dateInput = screen.getByLabelText(text.returnOfCar.form.endDate);
    const timeInput = screen.getByLabelText(text.returnOfCar.form.endTime);
    const meterInput = screen.getByLabelText(text.returnOfCar.form.meterreadingEnd);

    fireEvent.change(dateInput, { target: { value: "2024-01-02" } });
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    fireEvent.change(meterInput, { target: { value: "100" } });

    fireEvent.click(screen.getByRole("button", { name: text.button.submit }));

    await waitFor(async () => {
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(await screen.findByText(formatString(text.validation.minValue, "100"))).toBeInTheDocument();
    });
  });

  test("allows earlier endTime when endDate is after startDate", async () => {
    const mockDispatch = vi.fn();

    renderWithProviders(
      <ReturnOfCar rentalId="rental-123" startDate="2024-01-02T09:00" meterreadingStart={100} />,
      {},
      mockDispatch,
    );

    fireEvent.click(screen.getByRole("button", { name: text.returnOfCar.formButton }));

    const dateInput = screen.getByLabelText(text.returnOfCar.form.endDate);
    const timeInput = screen.getByLabelText(text.returnOfCar.form.endTime);
    const meterInput = screen.getByLabelText(text.returnOfCar.form.meterreadingEnd);

    fireEvent.change(dateInput, { target: { value: "2024-01-03" } });
    fireEvent.change(timeInput, { target: { value: "08:00" } });
    fireEvent.change(meterInput, { target: { value: "123" } });

    fireEvent.click(screen.getByRole("button", { name: text.button.submit }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: CarActions.UPDATE_RENTAL,
        payload: {
          meterreadingEnd: "123",
          endDate: "2024-01-03T08:00",
          rentalId: "rental-123",
        },
      });
    });
  });
});
