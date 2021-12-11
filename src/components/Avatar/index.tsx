import React from 'react';
import { IMAGE_PLACEHOLDERS } from '../../constants';
import classes from './index.module.css';

interface IProps {
  srcUrl: string;
  className?: string;
  title?: string;
  online?: boolean;
  small?: boolean;
}

const VAvatar = ({ className = '', srcUrl = '', title = '', online = false, small = false }: IProps) => {
  return (
    <div
      className={`${classes.avatar} ${className} ${online ? classes.online : ''} ${small ? classes.small : ''}`}
    >
      <img src={srcUrl || IMAGE_PLACEHOLDERS.AVATAR} title={title} alt={title || 'user avatar'} />
    </div>
  );
};

export default VAvatar;
