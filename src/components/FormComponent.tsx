import React from 'react';
import TextInput from './TextInput';
import {validationErrors} from '../services/FormApi';
import Message from '../common/Message';

export interface IFormParams {
    label: string;
    name: string;
}

export interface IFormProperties {
    name: string;
    value: string;
}

export interface IFormComponentProps {
     formInputs: IFormParams[];
}

export interface IFormComponentState {
     formPropertiesMap: Map<string, string>;
     validationErrorMessages: string[];
     showSuccessMsg: boolean;
}


class FormComponent extends React.Component<IFormComponentProps, IFormComponentState> {
    
    constructor(props: IFormComponentProps, state: IFormComponentState) {
         super(props);
         console.log("Props are :", props);

         this.state = {
             formPropertiesMap: new Map(),
             validationErrorMessages: [],
             showSuccessMsg: false
         }
    }

    handleSubmit = (evt: any) => {
        evt.preventDefault();
        console.log(this.state);
        //validationErrors(this.state.formPropertiesMap);
        let errorMessages: string[] = validationErrors(this.state.formPropertiesMap, this.props.formInputs);
        this.setState({validationErrorMessages: errorMessages});
       // console.log("State after submit is:", this.state);
       if(errorMessages && errorMessages.length === 0 ) {
           this.setState({showSuccessMsg: true})
       }
    }

    updateState = (name: string, value: string): void => {
        console.log("Name is:", name, " Value is:", value);
        let map = this.state.formPropertiesMap;
        map.set(name, value);       
    }
   

     render() {
         const {formInputs} = this.props;
         const { validationErrorMessages, showSuccessMsg} = this.state;
         
          return (
              <div>
                <form onSubmit={this.handleSubmit}>
                   <fieldset>
                    {formInputs.map( (v, index) => {
                       return  <TextInput label={v.label} name={v.name} index = {index} updateState={this.updateState}></TextInput>
                    })}
                     <br/> 
                    <input type="Submit" />
                    <br/>
                    <br/>
                    { (validationErrorMessages && validationErrorMessages.length > 0) && 
                    <div className="failed">
                         Please correct following Validation Errors and try again:
                         {
                             validationErrorMessages.map((v, index) => {
                                    return <li><Message message={v}></Message></li>
                             })
                         }
                    </div>    
                 }
                 {
                     (validationErrorMessages && validationErrorMessages.length === 0 && showSuccessMsg ) &&
                     <div className="passed">
                           <Message message ={"Validation Passed and Form Submitted Successfully!"}></Message>
                     </div>
                 }
                   </fieldset> 
                 </form> 
                
              </div>
              
          )
     }
}

export default FormComponent;