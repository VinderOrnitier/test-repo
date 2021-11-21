import { useMemo } from "react";
import { IPost } from "../modules/postList/postList.types";

export const useSortedPost = (posts: IPost[] | undefined, sort: any) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      // @ts-ignore:next-line
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }

    return posts;
  }, [sort, posts]);

  return sortedPosts;
}

export const usePosts = (posts: IPost[] | undefined, sort: string, query: string) => {
  const sortedPosts = useSortedPost(posts, sort);
  
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts?.filter((post: IPost) => post.title?.toLowerCase().includes(query.toLowerCase()));
  }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
}