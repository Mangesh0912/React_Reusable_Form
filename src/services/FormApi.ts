import {IFormParams} from '../components/FormComponent';

export const formApi = {};

export function validateText(value: string, property: string): string {
    let result: string = "passed";
    if(!value || (value && value.trim().length === 0) ) {
        result = "Please Enter Valid " +  property;
    }
    return result;
}

export function validateEmail(email: string, property: string): string {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let result: string = "passed";

    if(!email  || (email && reg.test(email) === false )) {
        result = "Please Enter Valid " +  property;
    }
    return result;
}


export function validateNumber(value: number, property:string): string {
     let result: string = "passed";

     if(!value || isNaN(value)) {
         result = "Please Enter Valid " + property;
     }

     return result;
}

export function validationErrors(map: Map<string, string>, formInput: IFormParams[]): string[] {

    let result: string[] = [];
    let inputProperties: string[] = [];

    formInput.forEach( v => inputProperties.push(v.name));
     
    if(map) {
        map.forEach((value, key) => {
             // console.log("Key is:", key, " Value is:", value);
             let name = key;
             let msg =  (name === "email") ? validateEmail(value, key) : validateText(value, key);
             let currIndex = inputProperties.indexOf(name);
             if(msg !== "passed") {
                 result.push(msg);
             }
             if(currIndex >= 0) {
                  inputProperties.splice(currIndex, 1);
             }              
        })
        inputProperties.forEach( v => {
            result.push(validateText("", v));
        })
    } 

    return result;
}

export function buildForm(formConfigs: IFormParams[]) : IFormParams[] {

     if(!formConfigs) {
         throw "Invalid Input Params";
     }

     formConfigs.forEach( v => {
           const name = v.name;
           const label = v.label;
           if(!name || !label) {
                throw "Invalid Input Params";
           }
     })

     return formConfigs;
}