import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';

const AddByUrlForm = () => {
  return (
    <Form>
      <h5>Save an item</h5>
      <Form.Field>
        <label>Enter Url</label>
        <input placeholder="http://..." />
      </Form.Field>
      <Button type="submit">Save</Button>
    </Form>
  );
};
// mapDispatch = dispatch => ({
//   handleSubmit(evt, userId){
//     evt.preventDefault();

//   }
// })
export default connect(null)(AddByUrlForm);
