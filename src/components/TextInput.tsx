import React from 'react';

export interface ITextInputProps {
    label: string;
    name: string;
    index: number;
    updateState(name: string, value: string): void;
}

export interface ITextInputState {
    value: string;
}


class TextInput extends React.Component<ITextInputProps, ITextInputState> {

     constructor(props: ITextInputProps, state: ITextInputState) {
            super(props);
            this.state = {
                value: ""
            }
     }

     handleChange = (evt: any) => {
          const name = evt.target.name;
          const value = evt.target.value;
          this.setState({value: value});
          this.props.updateState(name, value);
     }
   
      render() {
            const {label, name, index} = this.props;
            return(
                <label key={index}>
                    {label}
                    <br/>
                    <input type="text" name={name} value={this.state.value} onChange={this.handleChange}/>
                    <br/>
                    <br/>
                </label>
            )
      }
}

export default TextInput