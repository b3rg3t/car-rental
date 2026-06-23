import { FC } from "react";
import { text } from "../../localization/eng";
import { RentalInfromationResponse } from "../../models/types/rental-info/rentalInformationResponse";
import { ReturnOfCar } from "../../features/return-of-car/ReturnOfCar";

const {
  registrationNumber,
  socialSecurityNumber,
  carCategory,
  startTime,
  meterreadingStart,
} = text.newRegistration.form;

const { endDate, meterreadingEnd } = text.returnOfCar.form;

interface RentalItemProps {
  rental: Partial<RentalInfromationResponse>;
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
      </li>{" "}
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
          <span className="bold-text">{startTime}: </span> {rental.startDate}
        </p>
        {rental.endDate && (
          <p>
            <span className="bold-text">{endDate}: </span> {rental.endDate}
          </p>
        )}
      </li>
      {rental.price && (
        <>
          <hr />
          <li>{rental.price}</li>
        </>
      )}
    </ul>
    {isActive && (
      <>
        <hr />
        <ReturnOfCar rentalId={rental.rentalId!} />
      </>
    )}
  </li>
);
