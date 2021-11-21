import React from 'react';
import classes from './index.module.css';

const VSelect = ({...props}: any ) => {
  const onChangeSelect = (e: any) => props.onChange(e.target.value)

  return (
    <select
      className={`${classes.select} ${props?.className}`}
      value={props?.value}
      onChange={onChangeSelect}
    >
      <option defaultValue={props?.placeholder} hidden>{props?.placeholder}</option>
      {props?.options.map((option: any) => (
        <option key={option.value} value={option.value}>{option.name}</option>
      ))}
    </select>
  );
};

export default VSelect;
