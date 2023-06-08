const redux = require("redux");
const { default: thunk } = require("redux-thunk");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
// the state
const initialState = {
  loading: false,
  users: [],
  error: "",
};

//Actions

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

//Action Creators
const fecthUsersRequest = () => {
  return {
    type: FETCH_USERS_FAILURE,
  };
};
const fecthUsersSucceess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
const fecthUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

// Reducers function

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        user: [],
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fecthUsersRequest);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        //response data is the array of user
        const users = response.data.map((user) => user.id);
        dispatch(fecthUsersSucceess(users));
      })
      .catch((error) => {
        //error.msg is the error description
        dispatch(fecthUsersFailure(error.message));
      });
  };
};
// Store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
