import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Menu, Icon, Transition, Button } from 'semantic-ui-react';
import ContentHome from './ContentHome';


class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            folderOpen: false
        }
        this.toggleVisibility = this.toggleVisibility.bind(this)
    }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })


    render() {
        const { visible, folderOpen } = this.state
        return (
        <div>

        </div>
        )
    }
}

const mapState = (state) => {
    return {
        // email: state.user.email
    };
};

export default connect(mapState)(LeftSideBar);


// <Menu.Item onMouseOut={() => this.setState({folderOpen: false})} onMouseOver={() => this.setState({folderOpen: true})}name="folder">
// {folderOpen ?
//     <Icon name="folder open" /> :
//     <Icon name="folder" />
// }
//     Games
// </Menu.Item>
