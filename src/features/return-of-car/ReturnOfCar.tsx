import { useForm } from "react-hook-form";
import { text } from "../../localization/eng";
import { RentalInformationReturn } from "../../models/types/rental-info/rentalInformationReturn";
import { InputWrapper } from "../../components/input-wrapper/InputWrapper";
import { FC, useContext, useState } from "react";
import { CarContext } from "../../store/carContext";
import { RentalInformationBase } from "../../models/types/rental-info/rentalInformationBase";
import { CarActions } from "../../models/enums/store/carActions";
import { RentalInformationStart } from "../../models/types/rental-info/rentalInformationStart";
import { formatString } from "../utils/formatString";

const {
  header,
  form: { endDate, endTime, meterreadingEnd },
  formButton,
} = text.returnOfCar;

type RentalInformationForm = RentalInformationReturn & { endTime: string };

interface ReturnOfCarProps extends RentalInformationBase {
  startDate: RentalInformationStart["startDate"];
  meterreadingStart: RentalInformationStart["meterreadingStart"];
}

export const ReturnOfCar: FC<ReturnOfCarProps> = ({ startDate, meterreadingStart, rentalId }) => {
  const { dispatch } = useContext(CarContext);
  const [displayForm, setDisplayForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RentalInformationForm>();

  const onSubmit = (data: RentalInformationForm) => {
    const { endDate, endTime, ...rest } = data;

    const dateAndTime = `${endDate}T${endTime}`;

    dispatch({
      type: CarActions.UPDATE_RENTAL,
      payload: { ...rest, endDate: dateAndTime, rentalId },
    });
  };

  const handleCancelClick = () => {
    reset();
    setDisplayForm(false);
  };

  const minEndDate = startDate.split("T")[0];
  const minEndTime = startDate.split("T")[1];
  const endDateValue = watch("endDate");
  const isSameDay = endDateValue === minEndDate;

  if (!displayForm) {
    return (
      <button type="button" onClick={() => setDisplayForm(true)} className="primary-button return-of-car-button">
        {formButton}
      </button>
    );
  }

  return (
    <section>
      <form aria-labelledby="return-of-car" noValidate onSubmit={handleSubmit(onSubmit)}>
        <h3 id="return-of-car">{header}</h3>
        <InputWrapper label={endDate} fieldName="endDate" errors={errors}>
          <input
            id="endDate"
            {...register("endDate", {
              validate: {
                minEndDate: (value) => value >= minEndDate || formatString(text.validation.endDate, minEndDate),
              },
              required: text.validation.required,
            })}
            type="date"
            min={minEndDate}
          />
        </InputWrapper>
        <InputWrapper label={endTime} fieldName="endTime" errors={errors}>
          <input
            id="endTime"
            {...register("endTime", {
              required: text.validation.required,
              validate: {
                minEndTime: (value) =>
                  !isSameDay || value > minEndTime || formatString(text.validation.minTime, minEndTime),
              },
            })}
            type="time"
          />
        </InputWrapper>
        <InputWrapper label={meterreadingEnd} fieldName="meterreadingEnd" errors={errors}>
          <input
            id="meterreadingEnd"
            {...register("meterreadingEnd", {
              required: text.validation.required,
              validate: {
                greaterThanStart: (value) =>
                  Number(value) > meterreadingStart ||
                  formatString(text.validation.minValue, meterreadingStart.toString()),
              },
            })}
            min={meterreadingStart + 1}
            type="number"
          />
        </InputWrapper>
        <div className="button-group">
          <button type="reset" onClick={() => handleCancelClick()} className="secondary-button">
            {text.button.cancel}
          </button>
          <button type="submit" className="primary-button">
            {text.button.submit}
          </button>
        </div>
      </form>
    </section>
  );
};
