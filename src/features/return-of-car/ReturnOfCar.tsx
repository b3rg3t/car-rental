import { useForm } from "react-hook-form";
import { text } from "../../localization/eng";
import { RentalInformationReturn } from "../../models/types/rental-info/rentalInformationReturn";
import { InputWrapper } from "../../components/input-wrapper/InputWrapper";
import { FC, useContext, useState } from "react";
import { CarContext } from "../../store/carContext";
import { RentalInformationBase } from "../../models/types/rental-info/rentalInformationBase";
import { CarActions } from "../../models/enums/store/carActions";

const {
  header,
  form: { endDate, endTime, meterreadingEnd },
  formButton,
} = text.returnOfCar;

type RentalInformationForm = RentalInformationReturn & { endTime: string };

export const ReturnOfCar: FC<RentalInformationBase> = ({ rentalId }) => {
  const { dispatch } = useContext(CarContext);
  const [displayForm, setDisplayForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
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

  if (!displayForm) {
    return (
      <button onClick={() => setDisplayForm(true)} className="primary-button">
        {formButton}
      </button>
    );
  }

  return (
    <section>
      <h3 id="return-of-car">{header}</h3>
      <form aria-labelledby="return-of-car" onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper label={endDate} fieldName="endDate" errors={errors}>
          <input
            id="endDate"
            {...register("endDate", { required: text.validation.required })}
            type="date"
          />
        </InputWrapper>
        <InputWrapper label={endTime} fieldName="endTime" errors={errors}>
          <input
            id="endTime"
            {...register("endTime", { required: text.validation.required })}
            type="time"
          />
        </InputWrapper>
        <InputWrapper
          label={meterreadingEnd}
          fieldName="meterreadingEnd"
          errors={errors}
        >
          <input
            id="meterreadingEnd"
            {...register("meterreadingEnd", {
              required: text.validation.required,
            })}
            type="number"
          />
        </InputWrapper>
        <div className="button-group">
          <button
            type="reset"
            onClick={() => handleCancelClick()}
            className="secondary-button"
          >
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
