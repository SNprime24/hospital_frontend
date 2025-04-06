import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateDoctorMutation } from '../../redux/api/api';
import { useCreateMutation } from '../../hooks/hooks';

import { FormInput, FormSubmit, FormSelect } from './FormInput';

import classes from "./DEOFormsDesign.module.css";


const optionsList = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
  ];

  
function DoctorForm({type = "add"}) {
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        gender : "",
        spec : "",
        qualification : "",
        email : "",
        phoneNumber : null,
        address : "",
        inTime : null,
        outTime : null,
        room : "",
    })
    const [create] = useCreateMutation(useCreateDoctorMutation);
    const navigate = useNavigate();

    const handleFormChange = (e) => setFormData((prev)=>({...prev, [e.target.name] : e.target.value}));

    console.log(formData);

    const handleSubmit = async (e)=> {
        e.preventDefault();
        setFormData(prev => ({
            ...prev,
            name: prev.firstName + " " + prev.lastName,
            addr: prev.address
        }));
        create("Creating doctor...", formData, navigate);
        console.log(formData);
    }

    return(
        <div className={classes.formWrapper}>
            <div className={classes.formHeading}>
                <h1>{type==="add" ? "ADD DOCTOR" : "EDIT DOCTOR"}</h1>
            </div>
            <form>
                <div className={classes.formAbout}>
                    <h3>ABOUT</h3>
                    <div className={classes.formAboutInputs}>
                        <div className={classes.inputImage}>
                            <div className={classes.imagee}></div>
                        </div>
                        <div className={classes.inputAbout}>
                            <FormInput 
                                type = "text"
                                id = "DfirstName"
                                name = "firstName"
                                label = "First Name"
                                value = {formData.firstName}
                                onChange={handleFormChange}
                            />
                            <FormInput
                                type = "text"
                                id = "DlastName"
                                name = "lastName"
                                label = "Last Name"
                                value = {formData.lastName}
                                onChange={handleFormChange}
                            />
                            <FormInput
                                type = "text"
                                id = "Dgender"
                                name = "gender"
                                label = "Gender"
                                value = {formData.gender}
                                onChange={handleFormChange}
                            />
                        </div>       
                    </div>             
                </div>
                <div className={classes.formAbout}>
                    <h3>DOCTOR QUALIFICATION</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type = "text"
                            id = "Dspec"
                            name = "spec"
                            label = "Specialization"
                            value = {formData.spec}
                            onChange={handleFormChange}
                        />
                        <FormInput
                            type = "text"
                            id = "Dqualification"
                            name = "qualification"
                            label = "Qualification"
                            value = {formData.qualification}
                            onChange = {handleFormChange}
                        />
                    </div>
                </div>

                <div className={classes.formAbout}>
                    <h3>DOCTOR CONTACTS</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type = "email"
                            id = "Demail"
                            name = "email"
                            label = "E-mail"
                            value = {formData.email}
                            onChange={handleFormChange}
                        />
                        <FormInput
                            type = "number"
                            id = "DphoneNumber"
                            name = "phoneNumber"
                            label = "Phone Number"
                            value = {formData.phoneNumber}
                            onChange={handleFormChange}
                        />
                    </div>
                    <FormInput
                        type = "text"
                        id = "Dtext"
                        name = "address"
                        label = "Address"
                        value = {formData.address}
                        onChange={handleFormChange}
                    />
                </div>

                <div className={classes.formAbout}>
                    <h3>DOCTOR TIMINGS</h3>
                    <div className={classes.formFlex}>
                        <FormInput
                            type = "time"
                            id = "DinTime"
                            name = "inTime"
                            label = "In Time"
                            value = {formData.inTime}
                            onChange={handleFormChange}
                        />
                        <FormInput
                            type = "time"
                            id = "DoutTime"
                            name = "outTime"
                            label = "Out Time"
                            value = {formData.outTime}
                            onChange={handleFormChange}
                        />
                    </div>
                </div>

                <div className={classes.formAbout}>
                    <h3>DOCTOR ROOM</h3>
                    {/* const FormSelect = ({label, value, options, onChange, id, name, defaultValue, ...props}) =>{ */}
                    <FormSelect
                        id = "DRoom"
                        name = "room"
                        defaultValue="--Select a Room--"                        
                        label = "Room"
                        value = {formData.value}
                        onChange = {handleFormChange}
                        options = {optionsList}
                    />
                </div>

                <div className={classes.formSubmit}>
                    <FormSubmit 
                        handleSubmit = {handleSubmit}
                    > Submit </FormSubmit>
                </div>
            </form>
        </div>
    );
}

export {DoctorForm};