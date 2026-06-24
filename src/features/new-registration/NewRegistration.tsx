import { useForm } from "react-hook-form";
import { text } from "../../localization/eng";
import { RentalInformationStart } from "../../models/types/rental-info/rentalInformationStart";
import { CarTypes } from "../../models/enums/carTypes";
import { InputWrapper } from "../../components/input-wrapper/InputWrapper";
import { formatString } from "../utils/formatString";
import { useContext, useState } from "react";
import { CarContext } from "../../store/carContext";
import { CarActions } from "../../models/enums/store/carActions";

const {
  header,
  form: { registrationNumber, socialSecurityNumber, carCategory, startDate, startTime, meterreadingStart },
} = text.newRegistration;

type RentalInformationForm = RentalInformationStart & { startTime: string };

export const NewRegistration = () => {
  const { dispatch } = useContext(CarContext);
  const [displayForm, setDisplayForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RentalInformationForm>({
    defaultValues: {
      registrationNumber: "",
      socialSecurityNumber: "",
      carCategory: "" as unknown as CarTypes,
      startDate: "",
      startTime: "",
      meterreadingStart: null as unknown as number,
    },
  });

  const onSubmit = (data: RentalInformationForm) => {
    const { startDate, startTime, ...rest } = data;
    const dateAndTime = `${startDate}T${startTime}`;

    dispatch({
      type: CarActions.REGISTER_RENTAL,
      payload: {
        ...rest,
        startDate: dateAndTime,
        rentalId: crypto.randomUUID(), // Should be revieved from backend
      },
    });
    handleCancelClick();
  };

  const handleCancelClick = () => {
    reset();
    setDisplayForm(false);
  };

  if (!displayForm) {
    return (
      <button type="button" onClick={() => setDisplayForm(true)} className="primary-button">
        {header}
      </button>
    );
  }

  return (
    <section>
      <h2 id="new-registration">{header}</h2>
      <form aria-labelledby="new-registration" onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper label={registrationNumber} fieldName="registrationNumber" errors={errors}>
          <input
            id="registrationNumber"
            placeholder={"ABC-123"}
            {...register("registrationNumber", {
              required: text.validation.required,
              minLength: {
                value: 6,
                message: formatString(text.validation.minLength, "6"),
              },
              maxLength: {
                value: 8,
                message: formatString(text.validation.maxLength, "8"),
              },
            })}
          />
        </InputWrapper>
        <InputWrapper label={socialSecurityNumber} fieldName="socialSecurityNumber" errors={errors}>
          <input
            id="socialSecurityNumber"
            {...register("socialSecurityNumber", {
              required: text.validation.required,
              minLength: {
                value: 10,
                message: formatString(text.validation.minLength, "10"),
              },
              maxLength: {
                value: 12,
                message: formatString(text.validation.maxLength, "12"),
              },
            })}
            placeholder={"YYMMDDXXXX"}
          />
        </InputWrapper>
        <InputWrapper label={carCategory} fieldName="carCategory" errors={errors}>
          <select
            id="carCategory"
            {...register("carCategory", {
              required: text.validation.required,
            })}
            defaultValue={""}
          >
            <option value="" disabled>
              {carCategory}
            </option>
            {Object.values(CarTypes).map((carType) => (
              <option key={carType} value={carType}>
                {carType}
              </option>
            ))}
          </select>
        </InputWrapper>
        <InputWrapper label={startDate} fieldName="startDate" errors={errors}>
          <input
            id="startDate"
            {...register("startDate", { required: text.validation.required })}
            type="date"
            placeholder={startDate}
          />
        </InputWrapper>
        <InputWrapper label={startTime} fieldName="startTime" errors={errors}>
          <input
            id="startTime"
            {...register("startTime", { required: text.validation.required })}
            type="time"
            placeholder={startTime}
          />
        </InputWrapper>
        <InputWrapper label={meterreadingStart} fieldName="meterreadingStart" errors={errors}>
          <input
            id="meterreadingStart"
            {...register("meterreadingStart", {
              required: text.validation.required,
            })}
            type="number"
            placeholder={meterreadingStart}
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
