import React from 'react';
import classes from './index.module.css';

interface Option {
  value: any
  name: string
}

interface IProps {
  options?: Option[];
  value: string | number | [];
  onChange: (value: any) => void;
  placeholder?: string;
  className?: string;
  multiple?: boolean;
  size?: number;
}

const VSelect = ({ options, value, onChange, placeholder, className = '', multiple, size }: IProps) => {
  let onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    onChange(multiple ? [...e.target.selectedOptions].map((opt) => opt.value) : e.target.value);

  return (
    <select
      className={`${classes.select} ${className}`}
      value={value}
      onChange={onChangeSelect}
      multiple={multiple}
      size={size}
    >
      <option defaultValue={placeholder} hidden>
        {placeholder}
      </option>
      {options?.map((option: Option) => (
        <option
          key={option.value.id || option.value}
          value={option.value.id || option.value}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default VSelect;
