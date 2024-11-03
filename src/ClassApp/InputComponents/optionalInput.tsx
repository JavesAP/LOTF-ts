import { ChangeEvent, Component } from "react"
import { allCities } from "../../utils/all-cities"

export class ClassOptionInput extends Component<{
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}> {
  render () {
    const {label, onChange, value} = this.props
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
}