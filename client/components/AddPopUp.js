import React from 'react'
import { Popup, Icon } from 'semantic-ui-react'
import { AddByUrlForm } from './index'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const AddPopup = (props) => (
  <Popup id="add-popup" hoverable={true} trigger={<Icon name="add" color={props.theme} size="big" onClick={props.handleAddUrl} />}>
    <Popup.Header>Add Url</Popup.Header>
    {props.showForm ?
    <div>
      <br />
      <AddByUrlForm />
    </div> :
    '' }
  </Popup>
)

const mapState = state => {
  return {
    theme: state.theme
  }
}

export default connect(mapState)(AddPopup);

AddPopup.propTypes = {
  theme: PropTypes.string.isRequired
}

