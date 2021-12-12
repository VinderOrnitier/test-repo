import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { VAvatar, VLoader } from '..';
import { Comment } from '../../modules/postDetails/postDetails.types';

import classes from './index.module.css';

interface IProps {
  isCommentsLoading: boolean;
  comments: Comment[];
}

const VComments = ({ isCommentsLoading, comments }: IProps) => {
  
  return (
    <ul className="mt-4">
      <h4 className="text-2xl font-bold my-2">Comments</h4>
      {isCommentsLoading ? (
        <VLoader className="h-64" />
      ) : (
        comments?.map((comment: Comment) => (
          <li key={comment.id} className={`${classes.listItem} ml-6 border-b mb-1`}>
            <div className="flex items-center">
              <VAvatar className="mr-2" srcUrl={comment.photoURL} small />
              <h5 className="font-bold my-2">{comment.projectName || comment?.email}</h5>
              <span className="text-gray-600 text-sm ml-auto">
                {/* @ts-ignore */}
                {formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}
              </span>
            </div>
            <p className="mb-2">{comment?.content || comment?.body}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default VComments;
