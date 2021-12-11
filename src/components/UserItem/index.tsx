import React from 'react';
import VAvatar from '../Avatar';
import classes from './index.module.css';

interface IProps {
  className?: string,
  online?: boolean,
  srcUrl: string | undefined,
  userName?: string,
}

const UserItem = ({ className = '', srcUrl = '', userName = '', online = false}: IProps) => {
  return (
    <div className={`${classes.userItem} ${className}`}>
      <VAvatar srcUrl={srcUrl} className={'mr-2'} online={online}/>
      <div className="font-bold block truncate">{userName}</div>
    </div>
  );
};

export default UserItem;
