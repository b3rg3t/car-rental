import { text } from "../../localization/eng";

export function formatDate(date?: string): string {
  if (date) {
    const dateTime = new Date(date);

    return dateTime.toLocaleString();
  }

  return text.utils.invalidDate;
}
