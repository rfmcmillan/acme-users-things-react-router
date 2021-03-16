import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store, { loadUsers, loadThings, createUser } from './store';
import Nav from './Nav';
import Users from './Users';
import User from './User';
import { HashRouter as Router, Route } from 'react-router-dom';

/*
class Route extends Component {
  constructor() {
    super();
    this.state = {
      view: '',
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ view: window.location.hash.slice(1) });
    });
    this.setState({ view: window.location.hash.slice(1) });
  }

  render() {
    console.log(this.state);
    const HashConnected = this.props.component;
    return <HashConnected {...this.state} />;
  }
}
*/

const Home = () => <hr />;

const App = connect(
  (state) => {
    return state;
  },
  (dispatch) => {
    return {
      bootstrap: async () => {
        dispatch(loadUsers());
        dispatch(loadThings());
      },
    };
  }
)(
  class App extends Component {
    componentDidMount() {
      this.props.bootstrap();
    }
    render() {
      return (
        <Router>
          <div>
            <Route component={Nav} />
            <Route component={Home} path="/" exact />
            <Route component={Users} path="/users" exact />
            <Route component={User} path="/users/:id" />
          </div>
        </Router>
      );
    }
  }
);
//the 'exact' attribute above makes it so that the Home component only appears
//on the path that is an axact match for '/'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
