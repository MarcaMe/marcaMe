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
  VideoViewer,
  OneArticle,
  MyProfile,
  Follower,
  SingleCollection
} from './components';
import { me } from './store';
import ContentHome from './components/ContentHome';
import Following from './components/Following'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/videos" component={VideoViewer} />
            {isLoggedIn && (
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/content/:id" component={OneArticle} />
                <Route path="/home" component={ContentHome} />
                <Route path="/favorites" component={ContentHome} />
                <Route path="/archived" component={ContentHome} />
                <Route path="/profile/following/:id" component={Following} />
                <Route path="/profile/follower/:id" component={Follower} />
                <Route exact path="/profile/:id" component={MyProfile} />
                <Route path="/collections/:collectionId" component={SingleCollection} />
                <Route component={ContentHome} />
              </Switch>
            )}
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
    isLoggedIn: !!state.user.id
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
