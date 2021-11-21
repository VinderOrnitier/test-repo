import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classes from './index.module.css';

const VStep = ({ children, activeStep, tabIndex, completed, ...props }: any) => {
  const history = useHistory();
  const location = useLocation();

  // console.log('activeTab ---', tabIndex);

  const handleChangeStep = useCallback(
    (tabIndex: number) => {
      if(completed) {
        history.push({
          ...location,
          state: {
            activeStep: tabIndex,
          },
        });
      }
    },
    [history, completed, location]
  );

  return (
    <>
      <li
        {...props}
        className={`${classes.step} ${activeStep ? classes.active : ''} ${completed ? classes.completed : ''}`}
        onClick={() => handleChangeStep(tabIndex)}
      >
        {props.title}
        {children}
      </li>
      <hr />
    </>
  );
};

export default VStep;
