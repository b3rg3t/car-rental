import { RentalInformationReturn } from "./rentalInformationReturn";
import { RentalInformationStart } from "./rentalInformationStart";

export type RentalInfromationResponse = RentalInformationStart &
  RentalInformationReturn & {
    price: number;
  };
