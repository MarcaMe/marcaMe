import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'
import { Button, Icon, Divider } from 'semantic-ui-react'
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn } = props

  return (
    <div>
      <nav>
      <h1 id="logo">MarcaMe</h1>
        {
          isLoggedIn
            ? <div id="logout-nav">
              {/* The navbar will show these links after you log in */}
                <Link to="/home">
                  <Icon name="home" color="blue" size="big" />
                </Link>
                <Link to="/signup" onClick={handleClick}>
                 <Icon name="log out" color="grey" size="large">Logout</Icon>
                </Link>
            </div>
            : <div id="login-nav">
              {/* The navbar will show these links before you log in */}
              <Link to="/sidebar">All Content</Link>
              <Link to="/login">
                <Button color="instagram">Login</Button>
              </Link>
              <Link to="/signup">
                <Button color="teal">Sign Up</Button>
              </Link>
            </div>
        }
      </nav>
      <Divider />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
