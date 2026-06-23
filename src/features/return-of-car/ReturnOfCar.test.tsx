import { screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { ReturnOfCar } from "./ReturnOfCar";
import { text } from "../../localization/eng";
import { CarActions } from "../../models/enums/store/carActions";
import { renderWithProviders } from "../../utils/test-utils";

describe("ReturnOfCar", () => {
  test("toggles form visibility and cancel hides it", () => {
    const mockDispatch = vi.fn();

    renderWithProviders(
      <ReturnOfCar rentalId="rental-123" />,
      {},
      mockDispatch,
    );

    const openButton = screen.getByRole("button", {
      name: text.returnOfCar.formButton,
    });
    expect(openButton).toBeInTheDocument();

    fireEvent.click(openButton);
    expect(
      screen.getByRole("heading", { name: text.returnOfCar.header }),
    ).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", {
      name: text.button.cancel,
    });
    fireEvent.click(cancelButton);

    expect(
      screen.getByRole("button", { name: text.returnOfCar.formButton }),
    ).toBeInTheDocument();
  });

  test("submits form and dispatches UPDATE_RENTAL with combined date/time and rentalId", async () => {
    const mockDispatch = vi.fn();

    renderWithProviders(
      <ReturnOfCar rentalId="rental-123" />,
      {},
      mockDispatch,
    );

    fireEvent.click(
      screen.getByRole("button", { name: text.returnOfCar.formButton }),
    );

    const dateInput = screen.getByLabelText(text.returnOfCar.form.endDate);
    const timeInput = screen.getByLabelText(text.returnOfCar.form.endTime);
    const meterInput = screen.getByLabelText(
      text.returnOfCar.form.meterreadingEnd,
    );

    fireEvent.change(dateInput, { target: { value: "2024-01-01" } });
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    fireEvent.change(meterInput, { target: { value: "123" } });

    fireEvent.click(screen.getByRole("button", { name: text.button.submit }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: CarActions.UPDATE_RENTAL,
        payload: {
          meterreadingEnd: "123",
          endDate: "2024-01-01T12:00",
          rentalId: "rental-123",
        },
      });
    });
  });
});
