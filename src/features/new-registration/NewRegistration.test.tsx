import { screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { NewRegistration } from "./NewRegistration";
import { text } from "../../localization/eng";
import { CarActions } from "../../models/enums/store/carActions";
import { CarTypes } from "../../models/enums/carTypes";
import { renderWithProviders } from "../../utils/test-utils";

describe("NewRegistration", () => {
  test("toggles registration form visibility and cancel hides it", () => {
    const mockDispatch = vi.fn();

    renderWithProviders(<NewRegistration />, {}, mockDispatch);

    const openButton = screen.getByRole("button", {
      name: text.newRegistration.header,
    });
    expect(openButton).toBeInTheDocument();

    fireEvent.click(openButton);

    expect(
      screen.getByRole("heading", {
        name: text.newRegistration.header,
      }),
    ).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", {
      name: text.button.cancel,
    });
    fireEvent.click(cancelButton);

    expect(
      screen.getByRole("button", {
        name: text.newRegistration.header,
      }),
    ).toBeInTheDocument();
  });

  test("submits form and dispatches REGISTER_RENTAL with combined startDate and startTime", async () => {
    const mockDispatch = vi.fn();
    const uuid = "test-rental-id-for-test";

    vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue(uuid);

    renderWithProviders(<NewRegistration />, {}, mockDispatch);

    fireEvent.click(
      screen.getByRole("button", {
        name: text.newRegistration.header,
      }),
    );

    fireEvent.change(
      screen.getByLabelText(text.newRegistration.form.registrationNumber),
      { target: { value: "ABC-123" } },
    );
    fireEvent.change(
      screen.getByLabelText(text.newRegistration.form.socialSecurityNumber),
      { target: { value: "9001011234" } },
    );
    fireEvent.change(
      screen.getByLabelText(text.newRegistration.form.carCategory),
      { target: { value: CarTypes.SmallCar } },
    );
    fireEvent.change(
      screen.getByLabelText(text.newRegistration.form.startDate),
      { target: { value: "2025-05-05" } },
    );
    fireEvent.change(
      screen.getByLabelText(text.newRegistration.form.startTime),
      { target: { value: "10:30" } },
    );
    fireEvent.change(
      screen.getByLabelText(text.newRegistration.form.meterreadingStart),
      { target: { value: "42" } },
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: text.button.submit,
      }),
    );

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: CarActions.REGISTER_RENTAL,
        payload: {
          registrationNumber: "ABC-123",
          socialSecurityNumber: "9001011234",
          carCategory: CarTypes.SmallCar,
          meterreadingStart: "42",
          startDate: "2025-05-05T10:30",
          rentalId: uuid,
        },
      });
    });

    expect(
      screen.getByRole("button", {
        name: text.newRegistration.header,
      }),
    ).toBeInTheDocument();
  });
});
