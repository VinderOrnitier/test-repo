import React from 'react';
import { Link } from 'react-router-dom';

import { VButton } from '..';

import classes from './index.module.css'

const ListItem = (props: any) => (
  <li className={classes.item}>
    <div className={classes.itemContent}>
      <h4>{props.id}. {props.title}</h4>
      <p>{props.body}</p>
    </div>
    <div className={classes.itemControls}>
      <Link to={`/posts/${props.id}`}>
        <VButton >View</VButton>
      </Link>
      <VButton onClick={() => props.remove(props)}>Delete</VButton>
    </div>
  </li>
);

export default ListItem;