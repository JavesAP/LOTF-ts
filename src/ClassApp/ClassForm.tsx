import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { PhoneInput, UserInformation } from "../types";
import { ClassPhoneInput, ClassTextInput } from "./ClassCustromComp";
import { isEmailValid, isPhoneInputValid, isTextInputValid, isValidCity, validFormCheck } from "../utils/validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component<{
  phoneInputState: {
    phoneInput: PhoneInput
    setPhoneInput: (newArr: PhoneInput) => void
  }
  setUserInformation: (obj: UserInformation) => void
}> {
  state = {
    draftUserInfo: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      phone: ""
    },
    isSubmitted: null,
    isValid: null
  }

  setDraftUserInfo = (obj: UserInformation) => {
    this.setState({draftUserInfo: obj})
  }

  showError = (input: keyof UserInformation) => {
    const { isSubmitted, draftUserInfo } = this.state
    switch (input) {
      case 'firstName': 
        return isSubmitted && !isTextInputValid(draftUserInfo.firstName)
      case 'lastName': 
        return isSubmitted && !isTextInputValid(draftUserInfo.lastName)
      case 'email': 
        return isSubmitted && !isEmailValid(draftUserInfo.email)
      case 'city': 
        return isSubmitted && !isValidCity(draftUserInfo.city)
      case 'phone': 
        return isSubmitted && !isPhoneInputValid(draftUserInfo.phone)
      default: return false
    }
  }
  
  render() {
    const { phoneInput, setPhoneInput } = this.props.phoneInputState
    const { 
      draftUserInfo,
      draftUserInfo: {firstName, lastName, email, city, phone},
      isValid 
    } = this.state

    return (
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          this.setState({isSubmitted: true})
          const isFormValid = validFormCheck(firstName, lastName, email, city, phone)
          if (isFormValid) {
            this.props.setUserInformation(draftUserInfo)
            this.setState({isValid: true})
            this.setState({draftUserInfo: {
              firstName: '',
              lastName: '',
              email: '',
              city: ''
            }})
            setPhoneInput(['','','',''])
          } else {
            alert('Bad Inputs')
            this.setState({isValid: false})
          }
        }}
      >
        <u>
          <h3>User Information Form</h3>
        </u>
        <ClassTextInput 
          label={"First Name"} 
          inputProps={{
            onChange: (e) => {
              this.setState({draftUserInfo: {...draftUserInfo, firstName: e.target.value}})
            },
            value: firstName,
            placeholder: "Bilbo"
          }}
        />
        <ErrorMessage message={firstNameErrorMessage} show={!isValid && this.showError('firstName')} />
        <ClassTextInput 
          label={"Last Name"} 
          inputProps={{
            onChange: (e) => {
              this.setState({draftUserInfo: {...draftUserInfo, lastName: e.target.value}})
            },
            value: lastName,
            placeholder: "Baggins"
          }}
        />
        <ErrorMessage message={lastNameErrorMessage} show={!isValid && this.showError('lastName')} />
        <ClassTextInput 
          label={"Email"} 
          inputProps={{
            onChange: (e) => {
              this.setState({draftUserInfo: {...draftUserInfo, email: e.target.value}})
            },
            value: email,
            placeholder: "bilbo-baggins@adventurehobbits.net"
          }}
        />
        <ErrorMessage message={emailErrorMessage} show={!isValid && this.showError('email')} />
        <ClassTextInput 
          label={"City"} 
          inputProps={{
            onChange: (e) => {
              this.setState({draftUserInfo: {...draftUserInfo, city: e.target.value}})
            },
            value: city,
            placeholder: "Hobbiton"
          }}
        />
        <ErrorMessage message={cityErrorMessage} show={!isValid && this.showError('city')} />
        <ClassPhoneInput 
          phoneState={{ phoneInput, setPhoneInput: setPhoneInput}} 
          draftUserInfoState={{ draftUserInfo, setDraftUserInfo: this.setDraftUserInfo }}
        />
        <ErrorMessage message={phoneNumberErrorMessage} show={!isValid && this.showError('phone')} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
