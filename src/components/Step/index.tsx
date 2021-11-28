import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classes from './index.module.css';

interface IProps {
  tabIndex: number;
  title: string;
  completed: boolean;
  activeStep?: boolean;
  children?: React.ReactChild | React.ReactChildren;
}

const VStep = ({ children, activeStep, tabIndex, completed, title }: IProps) => {
  const history = useHistory();
  const location = useLocation();

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
        className={`${classes.step} ${activeStep ? classes.active : ''} ${completed ? classes.completed : ''}`}
        onClick={() => handleChangeStep(tabIndex)}
      >
        {title}
        {children}
      </li>
      <hr />
    </>
  );
};

export default VStep;
