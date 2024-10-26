import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { PhoneInput, UserInformation } from "../types";

export const FunctionalApp = () => {
  const [phoneInput, setPhoneInput] = useState<PhoneInput>(['','','',''])
  const [userInformation, setUserInformation] = useState<UserInformation | null>(null)

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userInformation} />
      <FunctionalForm 
        phoneState={{ phoneInput, setPhoneInput}}
        setUserInformation={ setUserInformation }
      />
    </>
  );
};
