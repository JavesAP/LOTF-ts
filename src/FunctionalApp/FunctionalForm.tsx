import { Dispatch, SetStateAction, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { PhoneInput, UserInformation } from "../types";
import { FunctionalPhoneInput, FunctionalTextInput } from "./customComponents";
import { isEmailValid, validFormCheck, isPhoneInputValid, isTextInputValid, isValidCity } from "../utils/validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({phoneState, setUserInformation}: {
  phoneState: {
    phoneInput: PhoneInput,
    setPhoneInput: Dispatch<SetStateAction<PhoneInput>>
  }
  setUserInformation: Dispatch<SetStateAction<UserInformation | null>>
}) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [invalidForm, setInvalidForm] = useState<boolean | null>(null)
  const [draftUserInfo, setDraftUserInfo] = useState<UserInformation>({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    phone: ''
  })

  const { phoneInput, setPhoneInput } = phoneState
  const { firstName, lastName, email, city, phone } = draftUserInfo

  const showFirstNameError = !isTextInputValid(firstName) && isSubmitted
  const showLastNameError = !isTextInputValid(lastName) && isSubmitted
  const showEmailError = !isEmailValid(email) && isSubmitted
  const showCityError = !isValidCity(city) && isSubmitted
  const showPhoneNumberError = !isPhoneInputValid(phone) && isSubmitted

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setIsSubmitted(true)
        const isFormValid = validFormCheck(firstName, lastName, email, city, phone)
        if (isFormValid) {
          setUserInformation({...draftUserInfo})
          setInvalidForm(false)
          setDraftUserInfo({
            firstName: '', 
            lastName: '', 
            email: '', 
            city: '', 
            phone:''
          })
          setPhoneInput(['','','',''])
        } else {
          alert('Bad Inputs')
          setInvalidForm(true)
        }
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>
      <FunctionalTextInput 
        label={"First Name"} 
        inputProps={{
          onChange: (e) => {
            setDraftUserInfo({...draftUserInfo, firstName: e.target.value})
          },
          value: firstName,
          placeholder: 'Bilbo'
        }}
      />
      <ErrorMessage message={firstNameErrorMessage} show={invalidForm && showFirstNameError} />
      <FunctionalTextInput 
        label={"Last Name"} 
        inputProps={{
          onChange: (e) => {
            setDraftUserInfo({...draftUserInfo, lastName: e.target.value})
          },
          value: lastName,
          placeholder: 'Baggins'
        }}
      />
      <ErrorMessage message={lastNameErrorMessage} show={invalidForm && showLastNameError} />
      <FunctionalTextInput 
        label={"Email"} 
        inputProps={{
          onChange: (e) => {
            setDraftUserInfo({...draftUserInfo, email: e.target.value})
          },
          value: email,
          placeholder: "bilbo-baggins@adventurehobbits.net"
        }}
      />      
      <ErrorMessage message={emailErrorMessage} show={invalidForm && showEmailError} />
      <FunctionalTextInput 
        label={"City"} 
        inputProps={{
          onChange: (e) => {
            setDraftUserInfo({...draftUserInfo, city: e.target.value})
          },
          value: city,
          placeholder: "Hobbiton"
        }}
      />      
      <ErrorMessage message={cityErrorMessage} show={invalidForm && showCityError} />
      <FunctionalPhoneInput 
        phoneInput={ phoneInput } 
        setPhoneInput={ setPhoneInput } 
        setDraftUserInfo={ setDraftUserInfo }
      />
      <ErrorMessage message={phoneNumberErrorMessage} show={invalidForm && showPhoneNumberError} />
      <input type="submit" value="Submit" />
    </form>
  );
};
