import createDataContext from './CreateDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload;

    case 'delete_blogPost':
      return state.filter((blog_post) => blogPost.id !== action.payload);

    case 'edit_blogPost':
      return state.map((blog_post) => {
        return blog_post.id === action.payload.id ? action.payload : blog_post;
      });

    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('blog_post');

    dispatch({ type: 'get_blogposts', payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    const response = await jsonServer.post('/blog_post', { title, content });

    if (callback) {
      callback();
    }
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blog_post/${id}`, { title, content });

    console.log(id, title, content);

    dispatch({ type: 'edit_blogPost', payload: { id, title, content } });

    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`blog_post/${id}`);

    dispatch({ type: 'delete_blogPost', payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
