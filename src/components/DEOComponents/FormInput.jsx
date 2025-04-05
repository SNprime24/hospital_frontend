import React  from 'react';

import classes from "./FormInput.module.css"

const FormInput = ({ label, value, onChange, type = "text", id, name, ...props}) => {
  return (
    <div className={classes.inputWrapper}>
      <input
        type={type}
        id={id}
        name = {name}
        value={value}
        className={classes.inputBar}
        onChange={onChange}
        placeholder=" "
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

const FormSubmit = ({ children, handleSubmit, ...props }) =>{
  return (
    <button 
      className={classes.formSubmit}
      onClick = {handleSubmit}
      {...props}
    >
      {children}
    </button>
  );
}

export  { FormInput,FormSubmit };
