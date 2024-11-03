import { ChangeEventHandler, Dispatch, SetStateAction, useRef } from "react"
import { PhoneInput, UserInformation } from "../../types"

export const FunctionalPhoneInput = ({phoneInput, setPhoneInput, setDraftUserInfo}: {
  phoneInput: PhoneInput
  setPhoneInput: Dispatch<SetStateAction<PhoneInput>>
  setDraftUserInfo: Dispatch<SetStateAction<UserInformation>>
}) => {
  const inputRefs = [
    useRef<HTMLInputElement>(null), 
    useRef<HTMLInputElement>(null), 
    useRef<HTMLInputElement>(null), 
    useRef<HTMLInputElement>(null)
  ]
  const ref0 = inputRefs[0]
  const ref1 = inputRefs[1]
  const ref2 = inputRefs[2]
  const ref3 = inputRefs[3]

  const createOnChangeHandler = (index: number): ChangeEventHandler<HTMLInputElement> => 
  (e) => {
    const phoneInputLimit = [2, 2, 2, 1]
    const indexMaxLength = phoneInputLimit[index]
    const nextInput = inputRefs[index + 1]
    const previousInput = inputRefs[index - 1]

    const value = e.target.value 
    const moveToNext = indexMaxLength === value.length && nextInput?.current
    const moveToPrevious = value.length === 0 && previousInput?.current

    if (value.length <= indexMaxLength && !isNaN(Number(value))) {
      const updatedPhoneInput = phoneInput.map((phoneInput, phoneInputIndex) => 
        index === phoneInputIndex ? value : phoneInput
      ) as PhoneInput
  
      if (moveToNext) nextInput.current?.focus()
      if (moveToPrevious) previousInput.current?.focus()
      setPhoneInput(updatedPhoneInput)
      setDraftUserInfo((prevState) => ({...prevState, phone: updatedPhoneInput.join('')}))
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
          createOnChangeHandler(0)
        }
      />
      -
      <input type="text" id="phone-input-2" placeholder="55" 
        ref={ref1}
        value={phoneInput[1]}
        onChange={
          createOnChangeHandler(1)
        }      
      />
      -
      <input type="text" id="phone-input-3" placeholder="55" 
        ref={ref2}
        value={phoneInput[2]}
        onChange={
          createOnChangeHandler(2)
        }      
      />
      -
      <input type="text" id="phone-input-4" placeholder="5" 
        ref={ref3}
        value={phoneInput[3]}
        onChange={
          createOnChangeHandler(3)
        }      
      />
    </div>
  </div>    
  )
}