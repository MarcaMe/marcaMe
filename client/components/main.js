import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, fetchAllContent } from '../store'
import { AddPopup } from './index'
import { Button, Icon, Divider } from 'semantic-ui-react'
import { ChangeTheme } from '../components'
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      showUrlForm: false
    }
   this.handleUrlButtonClick = this.handleUrlButtonClick.bind(this)
  }
  handleUrlButtonClick(){
    this.setState({showUrlForm: !this.state.showUrlForm})
  }

  componentDidMount() {
    this.props.fetchAllContentofUser();
  }

  render(){
  const { children, handleClick, isLoggedIn, theme, user } = this.props
    return (
      <div>
        <nav>
        <h1 id="logo">MarcaMe</h1>
          {
            isLoggedIn
              ? <div id="login-nav">
                {/* The navbar will show these links after you log in */}
                <ChangeTheme />
                <AddPopup handleAddUrl={this.handleUrlButtonClick} showForm={this.state.showUrlForm} />
                <Link to="/home">
                  <Icon name="home" color={theme} size="big" />
                </Link>
                <Link to={`/profile/${user.id}`}>
                  <Icon name="user" color="pink" size="big" />
                </Link>
                <Link to="/signup" onClick={handleClick}>
                  <Icon name="log out" color="grey" size="large">Logout</Icon>
                </Link>
              </div>
              : <div id="logout-nav">
              {/* The navbar will show these links before you log in */}
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
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id,
    theme: state.theme
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchAllContentofUser() {
      dispatch(fetchAllContent());
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
