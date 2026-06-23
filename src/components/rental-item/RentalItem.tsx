import { FC } from "react";
import { text } from "../../localization/eng";
import { ReturnOfCar } from "../../features/return-of-car/ReturnOfCar";
import { formatDate } from "../../features/utils/formatDate";
import { RentalInformation } from "../../models/types/rental-info/rentalInformation";

const {
  registrationNumber,
  socialSecurityNumber,
  carCategory,
  startTime,
  meterreadingStart,
} = text.newRegistration.form;

const { endDate, meterreadingEnd } = text.returnOfCar.form;

const { priceOfRental, currency } = text.listOfFinishedRentals;

interface RentalItemProps {
  rental: Partial<RentalInformation>;
  isActive?: boolean;
}

export const RentalItem: FC<RentalItemProps> = ({
  rental,
  isActive = false,
}) => (
  <li className="rental-item">
    <ul>
      <li>
        <span className="bold-text">{carCategory}:</span> {rental.carCategory}
      </li>
      <li>
        <span className="bold-text">{registrationNumber}: </span>
        {rental.registrationNumber}
      </li>
      <li>
        <span className="bold-text">{socialSecurityNumber}: </span>
        {rental.socialSecurityNumber}
      </li>
      <li>
        <hr />
      </li>
      <li className="items-between">
        <p>
          <span className="bold-text">{meterreadingStart}: </span>
          {rental.meterreadingStart}
        </p>
        {rental.meterreadingEnd && (
          <p>
            <span className="bold-text">{meterreadingEnd}: </span>
            {rental.meterreadingEnd}
          </p>
        )}
      </li>
      <li>
        <hr />
      </li>
      <li className="items-between">
        <p>
          <span className="bold-text">{startTime}: </span>
          {formatDate(rental.startDate)}
        </p>
        {rental.endDate && (
          <p>
            <span className="bold-text">{endDate}: </span>
            {formatDate(rental.endDate)}
          </p>
        )}
      </li>
      {rental.price && (
        <>
          <hr />
          <li>
            <span className="bold-text">{priceOfRental}: </span>
            {rental.price} {currency}
          </li>
        </>
      )}
    </ul>
    {isActive &&
      rental.rentalId &&
      rental.startDate &&
      rental.meterreadingStart && (
        <>
          <hr />
          <ReturnOfCar
            rentalId={rental.rentalId}
            startDate={rental.startDate}
            meterreadingStart={rental.meterreadingStart}
          />
        </>
      )}
  </li>
);
