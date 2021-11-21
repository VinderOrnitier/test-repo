import React from 'react'
import classes from './index.module.css'

const VStepper = ({children, ...props}: any) => {
  return (
    <ol {...props} className={`${classes.stepper} ${props?.className}`}>
      {children}
    </ol>
  )
}

export default VStepper

