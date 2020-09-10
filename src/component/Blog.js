import React from 'react'
import BlogPreviewItem from './BlogPreviewItem'
import { getAllBlogPostsRequest } from '../query_configs/blog_posts';
import { getAllBlogPostsByPath } from '../selectors/blog_posts';
import { useSelector } from 'react-redux';
import { useRequest } from 'redux-query-react';

const Blog = () => {
  const allBlogPostsByPath = useSelector(getAllBlogPostsByPath) || {};
  const { isPending, status } = useRequest(getAllBlogPostsRequest());

  if (isPending) {
    return 'Loading...';
  }
  if (typeof status === 'number' && status >= 400) {
    return 'Sorry! Something went wrong. Please try again.';
  }
  return (
    <>
      <p>This is the Blog Page</p>
      {
        renderBlogPreviewItems(allBlogPostsByPath)
      }
    </>
  )
}

const renderBlogPreviewItems = (allBlogPostsByPath) => {
  let items = [];
  for (let path in allBlogPostsByPath) {
    items.push(
        <BlogPreviewItem key={path} {...allBlogPostsByPath[path]} />);
  }
  return items;
}

export default Blog;
