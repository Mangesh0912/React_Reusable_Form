import React from 'react';
import FormComponent,{IFormParams} from './FormComponent';
import {buildForm} from '../services/FormApi';

export interface ITestFormComponentProps {

}
export interface ITestFormComponentState {
     formParams: IFormParams[]
}

class TestFormComponent extends React.Component<ITestFormComponentProps, ITestFormComponentState> {
   
    constructor(props: ITestFormComponentState, state: ITestFormComponentState) {
        super(props);
        this.state = {
              formParams: []
        }
       
    }

    componentDidMount() {
         this.populateFormConfigs();
    }

    populateFormConfigs = () => {
          const configs: IFormParams[] = [
              {label: "Name", name: "name"},
              {label: "City", name: "city"},
              {label: "Email", name: "email"},
              {label: "Employer", name: "employer"}
          ];

          this.setState({formParams: buildForm(configs)})
    }


     render() {
         return (
             <div>
                 <FormComponent formInputs={this.state.formParams}></FormComponent>
             </div>
         )
     }
}

export default TestFormComponent;