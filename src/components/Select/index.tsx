import React from 'react';
import classes from './index.module.css';

interface IProps {
  options?: any[];
  value: string | number;
  onChange: (value: any) => void;
  placeholder?: string
  className?: string
}

const VSelect = ({options, value, onChange, placeholder, className }: IProps) => {
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)

  return (
    <select
      className={`${classes.select} ${className}`}
      value={value}
      onChange={onChangeSelect}
    >
      <option defaultValue={placeholder} hidden>{placeholder}</option>
      {options?.map((option: any) => (
        <option key={option.value} value={option.value}>{option.name}</option>
      ))}
    </select>
  );
};

export default VSelect;
