import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';
import ContentHome from './ContentHome';
import store, { fetchCollections } from '../store'

class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            folderOpen: false
        }
        this.toggleVisibility = this.toggleVisibility.bind(this)
    }

    componentDidMount(){
        const collectionsThunk = fetchCollections()
        store.dispatch(collectionsThunk)
    }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })


    render() {
        const { visible, folderOpen } = this.state
        const { collections } = this.props
        return (
            <div>
            <Icon color="grey" size="big" name="sidebar" content={visible ? 'Hide' : 'Show'} onClick={this.toggleVisibility} onMouseOver={this.toggleVisibility} onMouseOut={this.toggleVisibility} id="hamburger">Collections</Icon>
            <Sidebar.Pushable >
                <Sidebar onMouseOver={() => this.setState({visible: true})} onMouseOut={this.toggleVisibility} className="sidebar" as={Menu} animation="overlay" visible={visible} width="thin" icon="labeled" vertical inverted>
                {collections &&
                collections.map(collection => {
                    return (
                        <Menu.Item key={collection.id} onMouseOut={() => this.setState({folderOpen: false})} onMouseOver={() => this.setState({folderOpen: true})}name="folder">
                        {folderOpen ?
                            <Icon name="folder open" /> :
                            <Icon name="folder" />
                        }
                        {collection.name}
                        </Menu.Item>
                    )})
                }
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
        collections: state.collections
    };
};

export default connect(mapState)(LeftSideBar);
