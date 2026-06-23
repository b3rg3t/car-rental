import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { PropsWithChildren, ReactElement } from "react";
import { CarContext } from "../store/carContext";
import { Mock } from "vitest";
import { CarState } from "../models/types/store/carState";

type ExtendedRenderOptions = Omit<RenderOptions, "queries"> & {};

export const renderWithProviders = (
  ui: ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
  mockDispatch: Mock,
  preloadedState?: CarState,
) => {
  const { ...renderOptions } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <CarContext.Provider
      value={{
        state: preloadedState ?? { activeRentals: [], finishedRents: [] },
        dispatch: mockDispatch,
      }}
    >
      {children}
    </CarContext.Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};
