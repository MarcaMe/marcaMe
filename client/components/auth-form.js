import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button, Form, Icon, Image } from 'semantic-ui-react'


/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="landing-page">
    <Image  src="/images/landingpage.jpg" />
    <div id="login-container">
    <h2 style={{textAlign: 'center'}}>{displayName}</h2>
      <Form id="login" onSubmit={handleSubmit} name={name} >
        <Form.Field>
          <label>Email</label>
          <input name="email" type="text" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input name="password" type="password" />
        </Form.Field>
        <Button color="instagram" type="submit">{displayName}</Button>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
      <div id="auth-form">
        <a href="/auth/google" className="login-buttons">
          <Button color="google plus">
            <Icon name="google" />{displayName} with Google
          </Button>
        </a>
        <a href="/auth/facebook" className="login-buttons">
          <Button color="facebook">
            <Icon name="facebook" />{displayName} with Facebook
          </Button>
        </a>
        <a href="https://chrome.google.com/webstore/detail/marca/ibimdbdkbidafjcohlpifkfogdpcagmn?hl=en" className="login-buttons">
          <Button color="green">
            <Icon name="chrome" />Download Chrome Extension
          </Button>
        </a>
      </div>
    </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
