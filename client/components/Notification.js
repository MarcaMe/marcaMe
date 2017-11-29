import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom'

class Notification extends Component{
    render(){
        return(
            <div>
            Yeeeah!
            </div>
        )
    }
}

export default connect()(Notification)