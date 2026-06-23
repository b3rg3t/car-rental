import { CarTypes } from "../../models/enums/carTypes";

const baseDayRental = 22;
const baseKmPrice = 1.5;

export function calculatePrice(
  startDate: string,
  endDate: string,
  carCategory: CarTypes,
  meterreadingStart: number,
  meterreadingEnd: number,
): number {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const rawDays = (end.getTime() - start.getTime()) / millisecondsPerDay;
  const numberOfDays = Math.max(0, Math.ceil(rawDays));

  const numberOfKm = Math.max(0, meterreadingEnd - meterreadingStart);

  switch (carCategory) {
    case CarTypes.SmallCar:
      return baseDayRental * numberOfDays;
    case CarTypes.Combi:
      return baseDayRental * numberOfDays * 1.3 + baseKmPrice * numberOfKm;
    case CarTypes.Truck:
      return (
        baseDayRental * numberOfDays * 1.5 + baseKmPrice * numberOfKm * 1.5
      );
    default:
      return 0;
  }
}
