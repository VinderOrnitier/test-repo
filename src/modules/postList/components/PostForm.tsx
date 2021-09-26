import React, { FormEvent, useState } from 'react';
import { VInput, VButton } from '../../../components';

const PostForm = ({ create }: any) => {
  const [post, setPost] = useState({ title: '', body: '' });

  const addNewPost = (e: React.FormEvent<FormEvent>) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
      userId: Date.now(),
    };
    create(newPost);
    setPost({ title: '', body: '' });
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, title: e.target.value });
  };

  const onChangeBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, body: e.target.value });
  };

  return (
    <form className="flex flex-col items-baseline">
      <VInput className="w-full mb-4" type="text" value={post.title} onChange={onChangeTitle} placeholder="Post name" />
      <VInput className="w-full mb-4" type="text" value={post.body} onChange={onChangeBody} placeholder="Post info" />
      <VButton onClick={addNewPost}>Add new post</VButton>
    </form>
  );
};

export default PostForm;
