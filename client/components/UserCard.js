import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card,  Image } from 'semantic-ui-react';

export class Following extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const user = this.props.singleUser;
        return (
            <div>
            <Card.Content style={{ overflow: 'hidden' }}>
            <Image
            style={{ width: '100%', display: 'block' }}
            fluid
            src={user.profilePicture}
          />
            <Card.Header>{user.email}</Card.Header>
            <div
              style={{ margin: '10px auto', overflow: 'hidden', height: '150px' }}
            >

            </div>
          </Card.Content>
            </div>
        )
    }
}

export default connect()(Following);
