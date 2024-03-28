const { createStore, combineReducers } = require("redux");

// Initial state
const initialState = {
  posts: [],
};

// users
const usersInitialState = {
  users: [],
};

// Actions (action, action creator)
// action constants
const ADD_POST = "ADD_POST";
const REMOVE_POST = "REMOVE_POST";
const ADD_USER = "ADD_USER";

// add post action creator
const addPostAction = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};

// add user action creator
const addUserAction = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

// remove post action creator
const removePostAction = (id) => {
  return {
    type: REMOVE_POST,
    id,
  };
};

// Reducers
// post reducer
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        posts: [...state.posts, action.payload],
      };
    case REMOVE_POST:
      return {
        posts: state.posts.filter((post) => {
          return post.id !== action.id;
        }),
      };
    default:
      return state;
  }
};

// users reducer
const usersReducer = (state = usersInitialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

// Root reducer
const rootReducer = combineReducers({
  posts: postReducer,
  users: usersReducer,
});

// Store
const store = createStore(rootReducer);

// Subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log("data ->", data);
  console.log("posts ->", data.posts);
  console.log("users ->", data.users);
});

// Dispatch
// add post action
store.dispatch(
  addPostAction({
    id: 1,
    title: "first post",
  })
);

store.dispatch(
  addPostAction({
    id: 2,
    title: "second post",
  })
);

// remove post action
store.dispatch(removePostAction(1));

// add new user
store.dispatch(addUserAction({ name: "John" }));
