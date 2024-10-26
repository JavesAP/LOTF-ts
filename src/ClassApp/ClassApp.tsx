import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { PhoneInput, UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
type State = { 
  userInformation: UserInformation | null
  phoneInput: PhoneInput
};

const defaultUser: UserInformation = {
  email: "default@default.com",
  firstName: "Default",
  lastName: "Default",
  phone: "1234567",
  city: "Hobbiton",
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    userInformation: null,
    phoneInput: ["","","",""]
  }
  
  setPhoneInput = (newArr: PhoneInput) => {
    this.setState({ phoneInput: newArr})
  }

  setUserInformation = (obj: UserInformation) => {
    this.setState({userInformation: obj})
  }
  render() {
    const { userInformation, phoneInput } = this.state

    return (
      <>
        <h2>Class</h2>
        <ProfileInformation 
          userData={
            userInformation ? userInformation : defaultUser
          }
        />
        <ClassForm 
          phoneInputState={{phoneInput, setPhoneInput: this.setPhoneInput}}
          setUserInformation={ this.setUserInformation }
          />
      </>
    );
  }
}
