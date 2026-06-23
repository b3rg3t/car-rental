import { RentalInformationReturn } from "./rentalInformationReturn";
import { RentalInformationStart } from "./rentalInformationStart";

export type RentalInformation = RentalInformationStart &
  RentalInformationReturn & { price: number };
