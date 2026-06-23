import { useContext } from "react";
import { text } from "../../localization/eng";
import { CarContext } from "../../store/carContext";
import { RentalItem } from "../../components/rental-item/RentalItem";

const { header, noFinishedRentals } = text.listOfFinishedRentals;

export const ListOfFinishedRentals = () => {
  const {
    state: { finishedRents },
  } = useContext(CarContext);

  const renderList = () => {
    if (!finishedRents.length) {
      return <p>{noFinishedRentals}</p>;
    }
    return (
      <ul className="rental-list">
        {finishedRents.map((rental) => (
          <RentalItem key={rental.rentalId} rental={rental} />
        ))}
      </ul>
    );
  };

  return (
    <section>
      <h2>{header}</h2>
      {renderList()}
    </section>
  );
};
