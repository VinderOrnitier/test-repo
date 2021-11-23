import React from 'react'
import classes from './index.module.css'

interface IProps {
  className?: string;
  children?: React.ReactChild | React.ReactChildren | object;
}

const VStepper = ({children, className}: IProps) => {
  return (
    <ol className={`${classes.stepper} ${className}`}>
      {children}
    </ol>
  )
}

export default VStepper

