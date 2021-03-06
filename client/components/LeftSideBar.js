import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form, Label, Sticky, Icon } from 'semantic-ui-react';
import { Folder, Favorites } from '../components'
import { fetchCollections, postCollection, changeFilter } from '../store'
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'

export class LeftSideBar extends Component {
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
        const { collections, addCollection } = this.props
        const { showForm } = this.state
        return (
            <Sticky id="sidebar">
              <div className="collection">

              <div style={{display: 'flex', justifyContent: 'space-around'}} onClick={() => this.setState({showForm: true})}>
                  <Label id="add-collection" color="grey" size="medium">
                      <Icon name="add circle" />
                      Add a collection
                  </Label>
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
        )
    }
}

const mapState = (state) => {
    return {
        collections: state.collections
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
        },
        removeFilter() {
            dispatch(changeFilter(''))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(LeftSideBar));

LeftSideBar.propTypes = {
    collections: PropTypes.array.isRequired,
    getUserCollections: PropTypes.func.isRequired,
    addCollection: PropTypes.func.isRequired
}
