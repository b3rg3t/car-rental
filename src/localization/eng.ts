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
    form: {
      endDate: "End date",
      endTime: "End time",
      meterreadingEnd: "Meter reading end (km)",
    },
    formButton: "Register return of car",
  },
  listOfActiveRentals: {
    header: "List of active rentals",
    noActiveRentals: "No active rentals",
  },
  listOfFinishedRentals: {
    header: "List of finished rentals",
    noFinishedRentals: "No finished rentals",
    priceOfRental: "Price for the rental period",
    bookingNumber: "Booking number",
    currency: "$",
  },
  validation: {
    required: "This field is required",
    minLength: "Minimum length is {0}",
    maxLength: "Maximum length is {0}",
    minValue: "Value must be greater than {0}",
    endDate: "End date should be minimum {0}",
    minTime: "End time must be greater than {0}",
  },
  utils: {
    invalidDate: "Invalid date",
  },
  button: {
    submit: "Submit",
    cancel: "Cancel",
  },
} as const;
