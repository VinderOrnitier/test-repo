import React from 'react'
import classes from './index.module.css'

const VInput = ({...props}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input {...props} className={`${classes.input} ${props?.className}`} />
  )
}

export default VInput

