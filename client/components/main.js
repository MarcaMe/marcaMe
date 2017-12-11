import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { AddPopup, SearchFriends, NotificationIcon } from './index';
import {
  Header,
  Modal,
  Image,
  Button,
  Icon,
  Divider,
  Dropdown,
  Progress
} from 'semantic-ui-react';
import {
  logout,
  fetchAllContentForUser,
  changeFilter,
  fetchAllUsers
} from '../store';
import history from '../history';
import { ChangeTheme } from '../components';
import { setTimeout } from 'core-js/library/web/timers';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUrlForm: false
    };
    this.handleUrlButtonClick = this.handleUrlButtonClick.bind(this);
  }
  handleUrlButtonClick() {
    this.setState({ showUrlForm: !this.state.showUrlForm });
  }

  componentDidMount() {
    this.props.fetchAllContentofUser();
    this.props.getAllUsers();
  }

  render() {
    console.log(this.props.content[0])
    this.props.content.length && (
    console.log("HELLO", Object.keys(this.props.content[0]).length)
      )

    const {
      children,
      handleClick,
      isLoggedIn,
      theme,
      user,
      users,
      removeFilter
    } = this.props;

    return (
      <div>
        <nav>
          <Link to="/home">
            <div className="homeLogo" onClick={() => removeFilter()}>
              <Image
                id="logo"
                src={
                  'https://lh3.googleusercontent.com/2-WfRSBzcNcx443BE8Iu8qQ_R6oTttpLHExA3Ak1G76mB5gFFQyB_pJhnHknfbA4vg=h310'
                }
              />
              <h1 id="logo">marca !</h1>
            </div>
          </Link>
          {isLoggedIn ? (
            <div id="login-nav">
              {/* The navbar will show these links after you log in */}
              <SearchFriends allUsers={users} />
              <AddPopup
                handleAddUrl={this.handleUrlButtonClick}
                showForm={this.state.showUrlForm}
              />
              <NotificationIcon />
              <Link to="/home">
                <Icon
                  name="home"
                  color={theme}
                  size="big"
                  onClick={() => removeFilter()}
                />
              </Link>
              <Link to={`/profile/${user.id}`}>
                <Icon name="user circle outline" size="big" />
              </Link>
              <Dropdown text={user.firstName}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      history.push('/user/edit');
                    }}
                  >
                    <Icon name="user" />Edit Account
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Modal
                      trigger={
                        <Dropdown.Item>
                          <Icon name="setting" /> Edit Settings
                        </Dropdown.Item>
                      }
                    >
                      <Header
                        icon="settings"
                        content="Change your theme"
                      />{' '}
                      <Modal.Actions>
                        <ChangeTheme />
                      </Modal.Actions>
                    </Modal>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleClick}>
                    <Icon name="log out" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <div id="logout-nav">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">
                <Button color="instagram">Login</Button>
              </Link>
              <Link to="/signup">
                <Button color="teal">Sign Up</Button>
              </Link>
            </div>
          )}
        </nav>
        <Divider />
        {children}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id,
    theme: state.theme,
    filter: state.filter,
    users: state.searchFriends,
    content: state.content
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
    fetchAllContentofUser() {
      dispatch(fetchAllContentForUser());
    },
    removeFilter() {
      dispatch(changeFilter(''));
    },
    getAllUsers() {
      dispatch(fetchAllUsers());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
