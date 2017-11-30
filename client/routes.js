import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import {
  Main,
  Login,
  Signup,
  OneArticle,
  MyProfile,
  Follower,
  SingleCollection,
  Notification,
  EditUser,
} from './components';
import { me } from './store';
import ContentHome from './components/ContentHome';
import Following from './components/Following';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, hasNames } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            { isLoggedIn && hasNames &&
                <Switch>
                  <Route path="/user/edit" component={EditUser} />
                  <Route path="/content/:id" component={OneArticle} />
                  <Route path="/home" component={ContentHome} />
                  <Route path="/favorites" component={ContentHome} />
                  <Route path="/archived" component={ContentHome} />
                  <Route path="/profile/following/:id" component={Following} />
                  <Route path="/profile/follower/:id" component={Follower} />
                  <Route path="/profile/:id" component={MyProfile} />
                  <Route path="/collections/:collectionId" component={SingleCollection} />
                  <Route path="/notification" component={Notification} />
                  <Route component={ContentHome} />
                </Switch>
              }
             { isLoggedIn && !hasNames &&
               <Route component={EditUser} />
             }
             {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    hasNames: !!state.user.firstName
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
