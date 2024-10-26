import { ChangeEventHandler, Component, createRef } from "react";
import { InputProps, PhoneInput, UserInformation } from "../types";

export class ClassTextInput extends Component<{
    label: string
    inputProps: InputProps
}> {
    render() {
        return (
          <div className="input-wrap">
            <label>{this.props.label}:</label>
            <input {...this.props.inputProps}/>
          </div>
        )
    }
}

export class ClassPhoneInput extends Component<{
  phoneState: {
    phoneInput: PhoneInput
    setPhoneInput: (newArr: PhoneInput) => void
  }
  draftUserInfoState: {
    draftUserInfo: UserInformation
    setDraftUserInfo: (obj: UserInformation) => void
  }
}>{
  render() {
    const {
      phoneState: { phoneInput, setPhoneInput }, 
      draftUserInfoState: {draftUserInfo, setDraftUserInfo}} = this.props

    const refArr = [
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>()
    ]
    const ref0 = refArr[0]
    const ref1 = refArr[1]
    const ref2 = refArr[2]
    const ref3 = refArr[3]


    const CreateOnChangeHandler = (index: number): ChangeEventHandler<HTMLInputElement> => (e) => {
      const value = e.target.value

      const inputLimits = [2, 2, 2, 1]
      
      const currentLimit = inputLimits[index]
      const nextInput = refArr[index + 1]
      const previousInput = refArr[index - 1]
      
      const goNextInput = value.length === currentLimit && nextInput?.current
      const goPrevInput = value.length === 0 && previousInput?.current

      if (value.length <= currentLimit) {
      const newPhoneState = phoneInput.map((input, inputIndex) => 
        index === inputIndex ? value : input
      ) as PhoneInput

      if (goNextInput) nextInput.current?.focus()
      if (goPrevInput) previousInput.current?.focus()
      setPhoneInput(newPhoneState)
      setDraftUserInfo({...draftUserInfo, phone: newPhoneState.join('')})
    }
    }
    return (
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input type="text" id="phone-input-1" placeholder="55" 
            ref={ref0}
            value={phoneInput[0]}
            onChange={
              CreateOnChangeHandler(0)   
            }
          />
          -
          <input type="text" id="phone-input-2" placeholder="55" 
            ref={ref1}
            value={phoneInput[1]}
            onChange={
              CreateOnChangeHandler(1)   
            }
          />
          -
          <input type="text" id="phone-input-3" placeholder="55" 
            ref={ref2}
            value={phoneInput[2]}
            onChange={
              CreateOnChangeHandler(2)   
            }
          />
          -
          <input type="text" id="phone-input-4" placeholder="5" 
            ref={ref3}
            value={phoneInput[3]}
            onChange={
              CreateOnChangeHandler(3)   
            } 
          />
        </div>
      </div>
    )
  }
}