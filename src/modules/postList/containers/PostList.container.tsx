import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { ListItem, VButton, VLoader, VModal, VPagination } from '../../../components';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import { IPost } from '../postList.types';
import { service } from '../postList.module';
import { getPageCount } from '../../../utils';
import { usePosts } from '../../../hooks';
import { PATH } from '../../../constants';
import { MODULE_URL } from '../postList.constants';


const PostListContainer = () => {
  const [filtered, setFiltered] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const { data, isLoading, error} = service.useFetchAllPostsQuery({limit, page});
  const [createPost] = service.useCreatePostMutation();
  const [deletePost] = service.useDeletePostMutation();
  
  const sortedAndSearchedPosts = usePosts(data, filtered.sort, filtered.query);

  useEffect(() => {
    const url = `${PATH.SERVER}${MODULE_URL}`
    axios.head(url, { params: {_limit: -1}}).then((resp) => {
      const total = resp.headers['x-total-count'];
      setTotalPages(getPageCount(total, limit));
    });
  }, [limit]);

  const handlePost = (newPost: IPost) => {
    createPost(newPost);
    setModal(false);
  };

  const removePost = (post: IPost) => {
    deletePost(post)
  };

  const toggleModal = (modal: boolean) => {
    setModal(true);
  };

  const changePage = (page: number) => {
    setPage(page);
  };
  
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold my-4">Post list</h2>
        <VButton onClick={toggleModal}>Add new post</VButton>
      </div>
      <hr className="my-4" />
      <PostFilter filter={filtered} setFilter={setFiltered} />
      {error && <h2 className="text-3xl text-center font-bold my-4">{error}</h2>}
      {isLoading ? (
        <VLoader className="h-64" />
      ) : (
        <ul className="my-6">
          {sortedAndSearchedPosts?.length ? (
            <TransitionGroup className="overflow-x-hidden">
              {sortedAndSearchedPosts?.map((post: IPost, index: number) => (
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
        <PostForm create={handlePost} />
      </VModal>
    </>
  );
};

export default PostListContainer;
