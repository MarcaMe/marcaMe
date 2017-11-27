import React from 'react'
import { Select } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { changeColor } from '../store'
import PropTypes from 'prop-types'

const colorOptions = [
  {key: 'teal', text: 'teal', value: 'teal'},
  {key: 'black', text: 'black', value: 'black'},
  {key: 'red', text: 'red', value: 'red'},
  {key: 'orange', text: 'orange', value: 'orange'},
  {key: 'olive', text: 'olive', value: 'olive'},
  {key: 'green', text: 'green', value: 'green'},
  {key: 'blue', text: 'blue', value: 'blue'},
  {key: 'violet', text: 'violet', value: 'violet'},
  {key: 'purple', text: 'purple', value: 'purple'},
  {key: 'pink', text: 'pink', value: 'pink'},
  {key: 'brown', text: 'brown', value: 'brown'},
  {key: 'grey', text: 'grey', value: 'grey'}
]

const ChangeTheme = (props) => (
  <div id="change-theme">
  <Select placeholder="Select your theme" options={colorOptions} onChange={(evt, data) => props.changeUserTheme(evt, data)} />
  </div>
)

const mapDispatch = dispatch => {
  return {
    changeUserTheme(evt, data) {
      dispatch(changeColor(data.value))
    }
  }
}

export default connect(null, mapDispatch)(ChangeTheme)

ChangeTheme.propTypes = {
  changeUserTheme: PropTypes.func.isRequired
}
