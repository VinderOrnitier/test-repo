import React from 'react';
import classes from './index.module.css';

const IMG_PLACEHOLDER = 'https://via.placeholder.com/80'

interface IProps {
  className?: string,
  online?: boolean,
  srcUrl: string,
}

const VAvatar = ({ className = '', srcUrl = '', online = false}: IProps) => {
  return (
    <div className={`${classes.avatar} ${className} ${online ? classes.online : ''}`}>
      <img src={srcUrl || IMG_PLACEHOLDER} alt="user avatar" />
    </div>
  );
};

export default VAvatar;
