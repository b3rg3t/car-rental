import { RentalInformation } from "../rental-info/rentalInformation";
import { RentalInformationStart } from "../rental-info/rentalInformationStart";

export type CarState = {
  activeRentals: RentalInformationStart[];
  finishedRents: RentalInformation[];
};
