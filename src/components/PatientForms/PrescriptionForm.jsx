import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

import { FormInput, FormSelect } from "../DEOComponents/FormInput";

import classes from "./AppointForm.module.css";
import presClasses from "./PrescriptionForm.module.css";
import { useGetAllDrugsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hooks";


function PrescriptionForm({ type = "new", formData, setFormData, handleSubmit }) {
    const drugsData = useGetAllDrugsQuery();
    const errors = [{ isError: drugsData.isError, error: drugsData.error }];
    useErrors(errors);
    const fetchDrugs = drugsData?.data?.data;
    const drugsOptions = fetchDrugs?.map(drug => ({
        label: drug.name,
        value: drug._id,
    }))

    const handleFieldChange = (index, field, value) => {
        setFormData(prev =>
            prev.map((entry, ind) => (
                (ind === index) ? { ...entry, [field]: value } : entry
            ))
        )
    }

    const addNewField = () => {
        setFormData(prev => [...prev, { drug: null, dosage: "" }]);
    }

    const removeField = (index) => {
        setFormData(prev => prev.filter((_, ind) => ind !== index));
    }

    const onSubmit = () => {
        const validDrugs = formData.filter(data => data.drug || data.dosage);
        setFormData(validDrugs);
        handleSubmit();
    }

    console.log("formData", formData);

    return (
        <div className={classes.wrapper}>
            <h5>MEDICINES : </h5>

            {formData.map((entry, index) => (
                <div key={index} className={classes.divFlex}>
                    <FormSelect
                        label={`Medicine ${index + 1}`}
                        name={`drug-${index}`}
                        value={entry.drug}
                        onChange={(e) => handleFieldChange(index, "drug", e.target.value)}
                        options={drugsOptions}
                        defaultValue={entry?.drug?.name || "Choose Medicine"}
                    />
                    <FormInput
                        type="text"
                        id={`dosage-${index}`}
                        name={`dosage-${index}`}
                        label="Dosage"
                        value={entry.dosage}
                        onChange={(e) => handleFieldChange(index, "dosage", e.target.value)}
                    />
                    <button
                        className={`${classes.chooseInput} ${presClasses.rmvBtn}`}
                        onClick={() => removeField(index)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            ))}

            <button
                className={`${classes.chooseInput} ${presClasses.presBtn}`}
                onClick={addNewField}
            >
                <FontAwesomeIcon icon={faPlusCircle} />
            </button>

            <button className={classes.submitBtn} onClick={onSubmit}>
                Submit
            </button>

        </div>
    );
}

export { PrescriptionForm }

