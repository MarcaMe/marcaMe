import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Button, Menu, Icon, Header } from 'semantic-ui-react';
import ContentHome from './ContentHome';

class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { visible } = this.state
        return (
            <div>
                <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation="overlay" width="thin" visible={visible} icon="labeled" vertical inverted>
                        <Menu.Item name="home">
                            <Icon name="home" />
                            Home
                        </Menu.Item>
                        <Menu.Item name="gamepad">
                            <Icon name="gamepad" />
                            Games
                        </Menu.Item>
                        <Menu.Item name="camera">
                            <Icon name="camera" />
                            Channels
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            <Header as="h1">Content</Header>
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
