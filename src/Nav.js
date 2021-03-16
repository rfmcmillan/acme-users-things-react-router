import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import faker from 'faker';
import { createUser } from './store';

const Nav = (props) => {
  return (
    <nav>
      <Link
        to="/"
        className={props.location.pathname === '/' ? 'selected' : ''}
      >
        Home
      </Link>
      <Link
        to="/users"
        className={props.location.pathname === '/users' ? 'selected' : ''}
      >
        Users({props.users.length}){' '}
      </Link>
      <button onClick={() => props.create(faker.name.firstName())}>
        Create User
      </button>
    </nav>
  );
};

//this mapStateToProps function is passed as the first argument to the connect()(Nav) call below.
// It takes the state as an argument and returns the state.
const mapStateToProps = (state) => {
  return state;
};

//this mapDispatchToProps function is passed as the first argument to the connect()(Nav) call below.
//It takes a dispatch call function as the argument and uses it to create dispatches from actionCreators
//In this case the actionCreator is called createUser
const mapDispatchToProps = (dispatch) => {
  return {
    create: (name) => {
      dispatch(createUser(name));
    },
  };
};

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      create: (name) => {
        dispatch(createUser(name));
      },
    };
  }
)(Nav);
