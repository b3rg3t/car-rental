import { useContext } from "react";
import { CarContext } from "../../store/carContext";
import { text } from "../../localization/eng";
import { RentalItem } from "../../components/rental-item/RentalItem";

const { header, noActiveRentals } = text.listOfActiveRentals;

export const ListOfActiveRentals = () => {
  const {
    state: { activeRentals: rentals },
  } = useContext(CarContext);

  const renderList = () => {
    if (!rentals.length) {
      return <p>{noActiveRentals}</p>;
    }
    return (
      <ul className="rental-list">
        {rentals.map((rental) => (
          <RentalItem key={rental.rentalId} rental={rental} isActive={true} />
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
