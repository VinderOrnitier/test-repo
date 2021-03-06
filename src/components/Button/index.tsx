import React from 'react';
import classes from './index.module.css';

const VButton = ({ children, ...props }: any) => {
  return (
    <button {...props} className={`${classes.button} ${props?.className}`}>
      {children}
    </button>
  );
};

export default VButton;
