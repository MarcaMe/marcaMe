import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Input, Form, Label } from 'semantic-ui-react';
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
            <div>
            <Icon name="add" color={theme} size="huge" onClick={() => this.setState({showForm: true})} />
            <Label color={theme} size="medium">Add a collection</Label>
            {showForm ?
            <Form onSubmit={(evt) => addCollection(evt)} >
                <Input name="input" placeholder="add collection"  />
            </Form> : ''}
            {collections ?
            collections.map(collection => {
            return (
            <div key={collection.id}>
                <Folder />
                <Label color={theme} size="medium">{collection.name}</Label>
            </div>
            )
            }) : 'No Collections'}

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
