import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'
import { AddByUrlForm } from './index'
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
    this.setState({showUrlForm:!this.state.showUrlForm})
  }

  render(){
  const { children, handleClick, isLoggedIn, user } = this.props
    return (
      <div>
        <h1>MarcaMe</h1>
        <nav>
          {
            isLoggedIn
              ? <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <a href="#" onClick={handleClick}>Logout</a>
                <button onClick={this.handleUrlButtonClick}>+</button>
                {this.state.showUrlForm&&
                  <AddByUrlForm user={user} />}                
              </div>
              : <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/sidebar">All Content</Link>
              </div>
          }
        </nav>
        <hr />
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
