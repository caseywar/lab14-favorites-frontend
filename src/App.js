import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Header from './Components/Header.js';
import PrivateRoute from './AuthPages/PrivateRoute.js';
import HomePage from './Components/HomePage.js';
import SignupPage from './AuthPages/SignupPage.js';
import LoginPage from './AuthPages/LoginPage.js';
import SearchPage from './Components/SearchPage.js';
import { getUserFromLocalStorage, putUserInLocalStorage } from './Utils/LocalstorageUtils';
import FavoritesPage from './FavoritesPage/FavoritesPage';

export default class App extends Component {
  state = {
    user: getUserFromLocalStorage()
  }

  handleUserChange = (user) => {
    this.setState({ user })

    putUserInLocalStorage(user);
  }

  handleLogout = () => {
    this.handleUserChange();
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <Router>
          <Header
            user={this.state.user}
            handleLogout={this.handleLogout} />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <HomePage {...routerProps} />}
            />
            <Route
              path="/search"
              exact
              render={(routerProps) => <SearchPage
                {...routerProps}
                user={this.state.user} />}
            />
            <PrivateRoute
              path="/favorites"
              exact
              token={user && user.token}
              render={(routerProps) =>
                <FavoritesPage
                  user={this.state.user}
                  {...routerProps}
                />}
            />
            <Route
              path="/login"
              exact
              render={(routerProps) =>
                <LoginPage
                  handleUserChange={this.handleUserChange}
                  {...routerProps}
                />}
            />
            <Route
              path="/signup"
              exact
              render={(routerProps) =>
                <SignupPage
                  handleUserChange={this.handleUserChange}
                  {...routerProps}
                />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}