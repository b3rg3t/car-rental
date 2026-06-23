import { CarActions } from "../../enums/store/carActions";
import { RentalInformationBase } from "../rental-info/rentalInformationBase";
import { RentalInformationReturn } from "../rental-info/rentalInformationReturn";
import { RentalInformationStart } from "../rental-info/rentalInformationStart";

export type CarPayload = {
  [CarActions.REGISTER_RENTAL]: RentalInformationStart;
  [CarActions.UPDATE_RENTAL]: RentalInformationReturn & RentalInformationBase;
};
