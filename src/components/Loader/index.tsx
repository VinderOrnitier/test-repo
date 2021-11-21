import React from 'react'
import classes from './index.module.css'

const VLoader = ({...props}: any) => {
  return (
    <div {...props} className={`${classes.loaderWrapper} ${props?.className}`}>
      <div className={classes.loader} />
    </div>
  )
}

export default VLoader

