import { USD_TO_VND_RATE, USD, VND, EXCLUSIVE_PLAN_FEE } from "./constants";

export const exchangeConvert = (currency) => {
  return currency === "USD"
    ? `${USD} ${EXCLUSIVE_PLAN_FEE}`
    : `${USD_TO_VND_RATE * EXCLUSIVE_PLAN_FEE} ${VND}`;
};
