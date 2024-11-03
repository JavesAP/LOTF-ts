import { ChangeEvent } from "react"
import { allCities } from "../../utils/all-cities"

export const FunctionalOptionInput = ({label, value, onChange}: {
    label: string
    value: string
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}) => {
    return ( 
      <>
        <label>{label}</label>
          <select 
            value={value} 
            onChange={onChange}
            placeholder="Hobbiton"  
          >
            {allCities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
      </>
    )
}