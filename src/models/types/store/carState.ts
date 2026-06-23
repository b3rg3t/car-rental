import { RentalInformationReturn } from "../rental-info/rentalInformationReturn";
import { RentalInformationStart } from "../rental-info/rentalInformationStart";

export type RentalInformation = RentalInformationStart &
  RentalInformationReturn;

export type CarState = {
  activeRentals: RentalInformationStart[];
  finishedRents: RentalInformation[];
};
