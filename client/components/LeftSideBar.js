import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Input, Form, Label, Sticky } from 'semantic-ui-react';
import { Folder } from '../components'
import { fetchCollections, postCollection } from '../store'


class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false
        }
    }
    componentDidMount() {
        this.props.getUserCollections();
    }

    render() {
        const { collections, addCollection, theme } = this.props
        const { showForm } = this.state
        return (
            <div id="sidebar">
            <Sticky>
            <div className="collection">
            <Icon name="add" color={theme} size="huge" onClick={() => this.setState({showForm: true})} />
            <Label color={theme} size="small">Add a collection</Label>
            {showForm ?
            <Form onSubmit={(evt) => addCollection(evt)} >
                <Input name="input" placeholder="add collection"  />
            </Form> : ''}
            </div>
            {collections ?
            collections.map(collection => {
            return (
            <div key={collection.id} className="collection">
                <Folder />
                <Label color={theme} size="small">{collection.name}</Label>
            </div>
            )
            }) : 'No Collections'}
            </Sticky>
          </div>
        )
    }
}

const mapState = (state) => {
    return {
        collections: state.collections,
        theme: state.theme
    };
};


const mapDispatch = dispatch => {
    return {
        getUserCollections() {
            dispatch(fetchCollections())
        },
        addCollection(evt) {
            const newCollection = {
                name: evt.target.input.value
            }
            dispatch(postCollection(newCollection))
        }
    }
}

export default connect(mapState, mapDispatch)(LeftSideBar);
