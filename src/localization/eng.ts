export const text = {
  header: "🚗 Car rental",
  newRegistration: {
    header: "Register rental",
    form: {
      registrationNumber: "Registration number",
      socialSecurityNumber: "Social security number",
      carCategory: "Car category",
      startDate: "Start date",
      startTime: "Start time",
      meterreadingStart: "Meter reading start (km)",
    },
  },
  returnOfCar: {
    header: "Return of car",
    form: { endDate: "End date", meterreadingEnd: "Meter reading end (km)" },
    formButton: "Register return of car",
  },
  listOfActiveRentals: {
    header: "List of active rentals",
    noActiveRentals: "No active rentals",
  },
  listOfFinishedRentals: {
    header: "List of finished rentals",
    noFinishedRentals: "No finished rentals",
  },
  validation: {
    required: "This field is required",
    minLength: "Minimum length is {0}",
    maxLength: "Maximum length is {0}",
    pattern: "Invalid format, expected format is {0}",
  },
  button: {
    submit: "Submit",
    cancel: "Cancel",
  },
} as const;
