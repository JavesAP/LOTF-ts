import { allCities } from "./all-cities";

export function isEmailValid(emailAddress: string) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!emailAddress.match(regex);
}

export const isTextInputValid = (text: string) => {
    return text.split('')
    .every((letter) => letter.toLowerCase() !== letter.toUpperCase()) && text.length >= 2
}

export const isValidCity = (givenCity: string) => {
  return allCities.includes(givenCity)
}

export const isPhoneInputValid = (phoneNumber: string) => {
  return typeof Number(phoneNumber) === "number" && phoneNumber.length === 7
}

export const validFormCheck = (
firstName: string, lastName: string, email: string, city: string, phone: string) => {
  const isFNValid = isTextInputValid(firstName)
  const isLNValid = isTextInputValid(lastName)
  const isEMValid = isEmailValid(email)
  const isCityValid = isValidCity(city)
  const isPNValid = isPhoneInputValid(phone)
  return [isFNValid, isLNValid, isEMValid, isCityValid, isPNValid].every((bool) => bool === true)
}