import React from 'react'
import { Popup, Icon } from 'semantic-ui-react'
import { AddByUrlForm } from './index'

const AddPopup = (props) => (
  <Popup className="add-popup" hoverable={true} trigger={<Icon name="add" color="teal" size="big" onClick={props.handleAddUrl} />}>
    <Popup.Header>Add Url</Popup.Header>
    {props.showForm ?
    <div>
      <br />
      <AddByUrlForm />
    </div> :
    '' }
  </Popup>
)


export default AddPopup;

