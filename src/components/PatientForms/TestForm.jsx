import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

import { FormInput, FormSelect } from "../DEOComponents/FormInput";

import classes from "./AppointForm.module.css";
import presClasses from "./PrescriptionForm.module.css";


const fetchTests = [
    {
        _id: "661abc1234ef567890abcdef",
        name: "Blood Test",
        equip: "Syringe, Test Tubes",
        active: true,
        room: {
            _id: "660aaa1111aaa1111aaa1111",
            name: "Lab Room 1"
        },
        doctor: "660bbb2222bbb2222bbb2222",
        nurse: "660ccc3333ccc3333ccc3333"
    },
    {
        _id: "661abc1234ef567890abcdea",
        name: "X-Ray",
        equip: "X-Ray Machine",
        active: true,
        room: {
            _id: "660aaa1111aaa1111aaa1112",
            name: "Radiology Room"
        },
        doctor: "660bbb2222bbb2222bbb2223",
        nurse: "660ccc3333ccc3333ccc3334"
    },
    {
        _id: "661abc1234ef567890abcdeb",
        name: "MRI",
        equip: "MRI Scanner",
        active: false,
        room: {
            _id: "660aaa1111aaa1111aaa1113",
            name: "MRI Chamber"
        },
        doctor: "660bbb2222bbb2222bbb2224",
        nurse: "660ccc3333ccc3333ccc3335"
    }
];





// formData, setFormData,
function TestForm({ type = "new", formData, setFormData, handleSubmit }) {
    // const [formData, setFormData] = useState([
    //     {test : null, remark : ""}
    // ]);

    const testsOptions = fetchTests.map(test => ({
        label: `${test.name} (${test.room.name})`,
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
        const validDrugs = formData.filter(data => data.test || data.remark);
        setFormData(validDrugs);
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
                            defaultValue="Choose Test"
                        />
                        <button
                            className={`${classes.chooseInput} ${presClasses.rmvBtn}`}
                            onClick={() => removeField(index)}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <FormInput
                        type="text"
                        id={`Remark-${index}`}
                        name={`remark-${index}`}
                        label="Remark"
                        value={entry.remark}
                        onChange={(e) => handleFieldChange(index, "remark", e.target.value)}
                    />
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

