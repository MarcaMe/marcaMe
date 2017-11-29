import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { AddPopup, SearchFriends } from './index';
import {
  Header,
  Modal,
  Image,
  Button,
  Icon,
  Divider,
  Dropdown
} from 'semantic-ui-react';
import { logout, fetchAllContent, changeFilter } from '../store';
import { ChangeTheme } from '../components';
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
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
  }

  render() {
    const {
      children,
      handleClick,
      isLoggedIn,
      theme,
      user,
      removeFilter
    } = this.props;
    return (
      <div>
        <nav>
          <Link to="/home">
            <div className="homeLogo">
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
              <SearchFriends />
              <AddPopup
                handleAddUrl={this.handleUrlButtonClick}
                showForm={this.state.showUrlForm}
              />
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
                  <Dropdown.Item>Edit Account</Dropdown.Item>
                  <Dropdown.Item>
                    <Modal
                      trigger={<Dropdown.Item>Edit Settings</Dropdown.Item>}
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
                  <Link to="/signup">
                    <Dropdown.Item onClick={handleClick} icon="log out">
                      Logout
                    </Dropdown.Item>
                  </Link>
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
    filter: state.filter
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
    fetchAllContentofUser() {
      dispatch(fetchAllContent());
    },
    removeFilter() {
      dispatch(changeFilter(''));
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
