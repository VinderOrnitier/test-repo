import React from 'react';
import { VLoader } from '..';
import { IComment } from '../../modules/postDetails/postDetails.types';

interface IProps {
  isCommentsLoading: boolean;
  comments: IComment[] | undefined;
}

const VComments = ({ isCommentsLoading, comments }: IProps) => {
  return (
    <ul className="list-disc mt-4">
      <h4 className="text-2xl font-bold my-2">Comments</h4>
      {isCommentsLoading ? (
        <VLoader className="h-64" />
      ) : (
        comments?.map((comment: IComment) => (
          <li key={comment.id} className="ml-6">
            <h5 className="font-bold my-2">{comment?.email}</h5>
            <p>{comment?.body}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default VComments;
