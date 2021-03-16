import { createStore, combineReducers, applyMiddleware } from 'redux';
const LOAD_USERS = 'LOAD_USERS';
const CREATE = 'CREATE';
const LOAD_THINGS = 'LOAD_THINGS';
import axios from 'axios';
import thunk from 'redux-thunk';
//import logger from 'redux-logger';

//Reducers
const usersReducer = (state = [], action) => {
  if (action.type === LOAD_USERS) {
    state = action.users;
  }
  if (action.type === CREATE) {
    state = [...state, action.user];
  }
  return state;
};

const thingsReducer = (state = [], action) => {
  if (action.type === LOAD_THINGS) {
    state = action.things;
  }
  return state;
};

//Reducer Combiner

const reducer = combineReducers({
  users: usersReducer,
  things: thingsReducer,
});

//Create the Store

//apply logger here if you'd like
const store = createStore(reducer, applyMiddleware(thunk));

//Action Creators

const _loadUsers = (users) => {
  return {
    type: LOAD_USERS,
    users,
  };
};

const _createUser = (user) => {
  return {
    type: CREATE,
    user,
  };
};

const _loadThings = (things) => {
  return {
    type: LOAD_THINGS,
    things,
  };
};

const loadThings = () => {
  return async (dispatch) => {
    const things = (await axios.get('/api/things')).data;
    dispatch(_loadThings(things));
  };
};

const loadUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get('/api/users')).data;
    dispatch(_loadUsers(users));
  };
};

const createUser = (name) => {
  return async (dispatch) => {
    const user = (await axios.post('/api/users', { name })).data;
    dispatch(_createUser(user));
  };
};

export default store;
export { loadUsers, loadThings, createUser };
