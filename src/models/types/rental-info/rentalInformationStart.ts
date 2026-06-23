import { CarTypes } from "../../enums/carTypes";
import { RentalInformationBase } from "./rentalInformationBase";

export type RentalInformationStart = {
  registrationNumber: string;
  socialSecurityNumber: string;
  carCategory: CarTypes;
  startDate: string;
  meterreadingStart: number;
} & RentalInformationBase;
