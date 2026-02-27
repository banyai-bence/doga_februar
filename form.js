import { createForm, createInputField } from "./functions.js";
import { Manager } from "./manager.js";

class FormField{
    /**@type {HTMLInputElement} */
    #input;
    /**@type {string} */
    #name;
    /**@type {boolean} */
    #required;
    /**@type {HTMLDivElement} */
    #errorDiv;
    get value(){
        return this.#input.value? this.#input.value : undefined
    }
    get name(){
        return this.#name
    }
    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} labelContent 
     * @param {boolean} required 
     * @param {HTMLFormElement} parent 
     */
    constructor(id,name,labelContent,required,parent){
        const {errorElement, input} = createInputField({
            id,
            name,
            labelContent,
            required,
            parent
        })
        this.#errorDiv=errorElement
        this.#input=input
        this.#required=required
        this.#name=name
    }
    validate(){
        let result= true
        if(this.#required && !this.value){
            result=false
            this.#errorDiv.innerText="Kötelező"
        }
        else{
            this.#errorDiv.innerText=""
        }
        return result
    }
}

class FormController{
    /**@type {import("./functions").FormFieldType[]} */
    #formFieldElemList;
    /**@type {Manager} */
    #manager;
    /**
     * 
     * @param {import("./functions").FormFieldType[]} formFieldList 
     * @param {Manager} manager 
     */
    constructor(formFieldList, manager){
        this.#manager=manager
        this.#formFieldElemList=[] 
        createForm((form)=>{
            document.body.appendChild(form)
            for(const f of formFieldList){
                const formFieldElem= new FormField(f.id,f.name,f.label,f.required,form)
                this.#formFieldElemList.push(formFieldElem)
            }
        },(e)=>{
            e.preventDefault();
            const a = this.#createElement();
            if(a){
                this.#manager.addElement(a)
                e.target.reset();
            }
        })
    }
    #createElement(){
        let result= {}
        let valid= true
        for(const formField of this.#formFieldElemList){
            if(formField.validate()){
                result[formField.name] = formField.value
            }
            else{
                valid = false
            }
        }
        if(valid){
            return result
        }
        else{
            return null
        }
    }
}

export {FormController}