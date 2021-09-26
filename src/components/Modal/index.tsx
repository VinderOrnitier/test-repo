import React from 'react';

import classes from './index.module.css';
import IModal from '../../interfaces/IModal';

const VModal = ({ children, className = '', title, visible, setVisible }: IModal) => {
  const rootClasses = [classes.modal];

  if (visible) {
    rootClasses.push(classes.modalActive);
  }

  return (
    <div className={`${rootClasses.join(' ')} ${className}`}>
      <div className={classes.modalMask} onClick={(visible) => setVisible(false)} />
      <div className={classes.modalContent}>
        <h3>{title}</h3>
        <div className={classes.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default VModal;
