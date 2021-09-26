import React, { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ListItem, VButton, VLoader, VModal, VPagination } from '../../../components';
import { useFetching, usePosts } from '../../../hooks';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import { IPost } from '../postList.types';
import { urls } from '../../../api';
import { getPageCount } from '../../../utils';

const PostListContainer = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit: any, page: any) => {
    const response = await urls.PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    // @ts-ignore
    fetchPosts(limit, page);
  }, [limit]); // eslint-disable-line

  const createPost = (newPost: IPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post: IPost) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const toggleModal = (modal: boolean) => {
    setModal(true);
  };

  const changePage = (page: number) => {
    setPage(page);
    // @ts-ignore
    fetchPosts(limit, page);
  };
  
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold my-4">Post list</h2>
        <VButton onClick={toggleModal}>Add new post</VButton>
      </div>
      <hr className="my-4" />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h2 className="text-3xl text-center font-bold my-4">{postError}</h2>}
      {isPostsLoading ? (
        <VLoader className="h-64" />
      ) : (
        <ul className="my-6">
          {sortedAndSearchedPosts.length ? (
            <TransitionGroup className="overflow-x-hidden">
              {sortedAndSearchedPosts.map((post: IPost, index: number) => (
                <CSSTransition key={post.id} timeout={500} classNames="item-list">
                  <ListItem {...post} number={index + 1} remove={removePost} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          ) : (
            <h4 className="font-medium text-2xl text-center">No posts</h4>
          )}
        </ul>
      )}
      <VPagination
        totalPages={totalPages}
        currentPage={page}
        changePage={changePage}
        limit={limit}
        setLimit={setLimit}
      />
      <VModal title="Create post" visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </VModal>
    </>
  );
};

export default PostListContainer;
