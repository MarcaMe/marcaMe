import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form, Label, Sticky } from 'semantic-ui-react';
import { Folder, Favorites } from '../components'
import { fetchCollections, postCollection } from '../store'
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'

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
                <div style={{display: 'flex', justifyContent: 'space-around'}} onClick={() => this.setState({showForm: true})}>
                <Label color={theme} size="large" onClick={() => this.setState({showForm: true})}>Add a collection</Label>
                </div>
                {showForm ?
                <Form onSubmit={(evt) => {
                    addCollection(evt)
                    this.setState({showForm: false})
                    }}
                    >
                    <Input name="input" placeholder="add collection" />
                </Form> : null}
                </div>
                <Favorites />
                {collections ?
                collections.map(collection => {
                return (
                <div key={collection.id} className="collection">
                    <NavLink to={`/collections/${collection.id}`} >
                        <Folder id={collection.id} name={collection.name} />
                    </NavLink>
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

export default withRouter(connect(mapState, mapDispatch)(LeftSideBar));

LeftSideBar.propTypes = {
    collections: PropTypes.array.isRequired,
    theme: PropTypes.string.isRequired,
    getUserCollections: PropTypes.func.isRequired,
    addCollection: PropTypes.func.isRequired
}
