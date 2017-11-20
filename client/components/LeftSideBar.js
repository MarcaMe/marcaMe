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
            <Icon size="big" name="sidebar" content={visible ? 'Hide' : 'Show'} onMouseOver={this.toggleVisibility} onMouseOut={this.toggleVisibility} />

            <Sidebar.Pushable >
                <Sidebar onMouseOver={() => this.setState({visible: true})} onMouseOut={this.toggleVisibility} className="sidebar" as={Menu} animation="overlay" visible={visible} width="thin" icon="labeled" vertical inverted>
                    <Menu.Item name="home">
                        <Icon name="home" />
                        Home
                    </Menu.Item>
                    <Menu.Item onMouseOut={() => this.setState({folderOpen: false})} onMouseOver={() => this.setState({folderOpen: true})}name="folder">
                    {folderOpen ?
                        <Icon name="folder open" /> :
                        <Icon name="folder" />
                    }
                        Games
                    </Menu.Item>
                    <Menu.Item name="folder">
                        <Icon name="folder" />
                        Channels
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                    <Segment basic>
                        <ContentHome />
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
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
