import { format, formatDistance, formatRelative, subDays } from "date-fns";

export const formatToDMY = (dateTime) => {
  const originalDate = new Date(dateTime || null);
  const date =
    originalDate.getDate() < 10
      ? `0${originalDate.getDate()}`
      : originalDate.getDate();
  const month =
    originalDate.getMonth() + 1 < 10
      ? `0${originalDate.getMonth() + 1}`
      : originalDate.getMonth();
  return `${date}/${month}/${originalDate.getUTCFullYear()}`;
};
