import { Component } from "react"
import { InputProps } from "../../types"

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