import React from 'react';
import { useParams } from 'react-router-dom';
import { VButton, VComments, VLoader } from '../../../components';
import { goBackRedirect } from '../../../helpers';
import { service } from '../postDetails.module';

const PostDetailsContainer = () => {
  const { id } = useParams<{ id: string }>();

  const {data, isLoading, error} = service.useFetchPostQuery(id);
  const {data: comments, isLoading: commentsIsLoading , error: commentsError} = service.useFetchCommentsQuery(id);

  if (error || commentsError) {
    return <h3>{error || commentsError}</h3>
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold my-4">Post Details</h2>
        <VButton className="ml-auto block" onClick={goBackRedirect}>
          Back
        </VButton>
      </div>
      <hr className="my-4" />
      <div>
        {isLoading ? (
          <VLoader className="h-64" />
        ) : (
          <>
            <h3 className="text-white text-2xl font-bold my-2">
              {data?.id}. {data?.title}
            </h3>
            <p>{data?.body}</p>
            <VComments comments={comments?.comments} isCommentsLoading={commentsIsLoading} />
          </>
        )}
      </div>
    </>
  );
};

export default PostDetailsContainer;
