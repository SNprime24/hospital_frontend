import React  from 'react';

import classes from "./FormInput.module.css"

const FormInput = ({ label, value = "", onChange, type = "text", id, name, ...props }) => {
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

const FormSelect = ({label, value, options, onChange, id, name, defaultValue, defaultValueID, ...props}) =>{
  return (
    <div className={classes.inputWrapper}>
      <select 
        id = {id}
        name = {name}
        value ={value}
        className={classes.inputBar}
        onChange={onChange}
        {...props}
      >
        <option value= {defaultValueID} hidden>{defaultValue}</option>
        {options?.map((opt, index)=>(
          <option key={opt.value ?? index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

const FormTextArea = ({label, value, onChange, id, name, rows = 4, ...props}) => {
  return (
    <div className={classes.inputWrapper}>
      <textarea
        id = {id}
        name={name}
        value={value}
        className={classes.inputBar}
        onChange={onChange}
        placeholder=''
        rows = {rows}
        style={{maxWidth : '100%', minHeight : '100px', minWidth : '100%'}}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export  { FormInput,FormSubmit,FormSelect,FormTextArea };
