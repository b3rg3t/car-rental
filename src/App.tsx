import "./App.css";
import { text } from "./localization/eng";
import { NewRegistration } from "./features/new-registration/NewRegistration";
import { ListOfActiveRentals } from "./features/list-of-rentals/ListOfActiveRentals";
import { ListOfFinishedRentals } from "./features/list-of-rentals/ListOfFinishedRentals";

export const App = () => (
  <div className="app-section">
    <header className="app-header">
      <h1>{text.header}</h1>
    </header>
    <NewRegistration />
    <ListOfActiveRentals />
    <ListOfFinishedRentals />
  </div>
);
