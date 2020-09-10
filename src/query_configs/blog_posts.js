const SPACE_ID = '';
const ENVIRONMENT_ID = '';
const ACCESS_TOKEN = '';
const CONTENTFUL_DNS = 'https://cdn.contentful.com';

export const getAllBlogPostsRequest = () => {
  return {
    url: `${CONTENTFUL_DNS}/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/entries?`
        + `access_token=${ACCESS_TOKEN}&content_type=blog&order=-sys.createdAt`,
    transform: responseBody => {
      return {
        allBlogPostsByPath: responseBody.items,
      };
    },
    update: {
      allBlogPostsByPath: (_, next) => {
        let nextVal = {};
        if (next) {
          next.forEach(blogPost =>
              nextVal[blogPost.fields.path] = blogPost.fields);
        }
        return nextVal;
      }
    },
  };
};

export const getBlogPostRequest = (path) => {
  return {
    url: `${CONTENTFUL_DNS}/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/entries?`
        + `access_token=${ACCESS_TOKEN}&content_type=blog&fields.path=${path}`,
    transform: responseBody => {
      return {
        allBlogPostsByPath: responseBody && responseBody.items.length ? responseBody.items[0] : undefined,
      };
    },
    update: {
      allBlogPostsByPath: (prev, next) => {
        prev[path] = next.fields;
        return prev;
      }
    },
  };
};
