import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { DAYS_FOR_PLAN } from "./constants";

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

export const getDaysLeft = (extensionDate) => {
  const curDay = new Date();
  const extDat = new Date(extensionDate);
  const diffTime = Math.abs(extDat - curDay);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // console.log(diffDays + " days");
  return DAYS_FOR_PLAN - diffDays;
};
