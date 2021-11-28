import React from 'react';
import { Link } from 'react-router-dom';

import { VButton } from '..';
import { MODULE_URL } from '../../modules/postList/postList.constants';
import { IPost } from '../../modules/postList/postList.types';

import classes from './index.module.css'
interface IProps {
  post: IPost,
  remove: (post: IPost) => void,
}

const ListItem = ({post, remove}: IProps) => (
  <li className={classes.item}>
    <div className={classes.itemContent}>
      <h4>{post.id}. {post.title}</h4>
      <p>{post.body}</p>
    </div>
    <div className={classes.itemControls}>
      <Link to={`${MODULE_URL}/${post.id}`}>
        <VButton>View</VButton>
      </Link>
      <VButton onClick={() => remove(post)}>Delete</VButton>
    </div>
  </li>
);

export default ListItem;