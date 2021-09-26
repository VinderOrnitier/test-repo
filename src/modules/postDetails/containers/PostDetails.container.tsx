import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { urls } from '../../../api';
import { VButton, VComments, VLoader } from '../../../components';
import { goBackRedirect } from '../../../helpers';
import { useFetching } from '../../../hooks';
import { IPost } from '../../postList/postList.types';
import { IComments } from '../postDetails.types';

const PostDetailsContainer = () => {
  const [post, setPost] = useState<IPost>({});
  const [comments, setComments] = useState<IComments[]>([]);
  const { id } = useParams<{ id: string }>();

  const [fetchPost, isPostLoading, postError] = useFetching(async (id: string) => {
    const response = await urls.PostService.getPost(id);
    setPost(response.data);
  });

  const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id: string) => {
    const response = await urls.PostService.getPostComments(id);
    setComments(response.data);
  });

  useEffect(() => {
    // @ts-ignore
    fetchPost(id);
    // @ts-ignore
    fetchComments(id);
    // eslint-disable-next-line
  }, []);

  // if (loading) {
  //   return <h3>Loading...</h3>
  // }

  if (postError || commentsError) {
    return <h3>{postError || commentsError}</h3>
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
        {isPostLoading ? (
          <VLoader className="h-64" />
        ) : (
          <>
            <h3 className="text-white text-2xl font-bold my-2">
              {post.id}. {post.title}
            </h3>
            <p>{post.body}</p>
            <VComments comments={comments} isCommentsLoading={isCommentsLoading} />
          </>
        )}
      </div>
    </>
  );
};

export default PostDetailsContainer;
