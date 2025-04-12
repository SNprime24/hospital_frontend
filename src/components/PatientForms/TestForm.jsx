import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

import { FormInput, FormSelect } from "../DEOComponents/FormInput";

import classes from "./AppointForm.module.css";
import presClasses from "./PrescriptionForm.module.css";
import { useGetAllTestsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hooks";
import { useSelector } from "react-redux";


function TestForm({ type = "new", formData, setFormData, handleSubmit }) {
    const { user } = useSelector((state) => state.auth);

    const testsData = useGetAllTestsQuery();
    const errors = [{ isError: testsData.isError, error: testsData.error }];
    useErrors(errors);
    const fetchTests = testsData?.data?.data;
    const testsOptions = fetchTests?.map(test => ({
        label: `${test.name} (${test?.room?.name})`,
        value: test._id, 
    }))

    const handleFieldChange = (index, field, value) => {
        setFormData(prev =>
            prev.map((entry, ind) => (
                (ind === index) ? { ...entry, [field]: value } : entry
            ))
        )
    }

    const addNewField = () => {
        setFormData(prev => [...prev, { test: null, remark: "" }]);
    }

    const removeField = (index) => {
        setFormData(prev => prev.filter((_, ind) => ind !== index));
    }

    const onSubmit = () => {
        const validTests = formData
            .filter(data => data.test || data.remark)
            .map(data => {
                const fullTest = fetchTests?.find(test => test._id === data.test);
                return {
                    test: fullTest || data.test,
                    remark: data.remark
                };
            });

        setFormData(validTests);
        handleSubmit();
    }

    console.log("formData", formData);

    return (
        <div className={classes.wrapper}>
            <h5>TESTS : </h5>

            {formData.map((entry, index) => (
                <>
                    <div key={index} className={classes.divFlex}>
                        <FormSelect
                            label={`Test ${index + 1}`}
                            name={`test-${index}`}
                            value={entry.test}
                            onChange={(e) => handleFieldChange(index, "test", e.target.value)}
                            options={testsOptions}
                            defaultValue={entry?.test?.name || "Choose Test"}
                        />
                        <button
                            className={`${classes.chooseInput} ${presClasses.rmvBtn}`}
                            onClick={() => removeField(index)}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    {console.log("testing",user._id, entry)}
                    {(user?._id === entry?.test?.doctor || user?._id === entry?.test?.nurse) && 
                        <FormInput
                            type="text"
                            id={`Remark-${index}`}
                            name={`remark-${index}`}
                            label="Remark"
                            value={entry.remark}
                            onChange={(e) => handleFieldChange(index, "remark", e.target.value)}
                        />
                    }
                </>
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

export { TestForm }

