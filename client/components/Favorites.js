import React from 'react';
import { connect } from 'react-redux';
import { Icon, Label } from 'semantic-ui-react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'
import { changeFilter } from '../store';

export const Favorites = (props) => {
  const { theme, addFilter, filter } = props
  console.log(filter)
  return (
    <div>
      <div onClick={() => addFilter('favorites')}>
      <NavLink to="/home">
        <Icon name="favorite" color={theme} size="big" className="collection" />
        <Label basic color={theme} size="tiny">Favorites</Label>
      </NavLink>
      </div>
      <div onClick={() => addFilter('archived')}>
        <NavLink to="/home">
          <Icon name="archive" color={theme} size="big" className="collection" />
          <Label basic color={theme} size="tiny">Archive</Label>
        </NavLink>
      </div>
    </div>
    )
}


const mapState = (state) => {
  return {
      theme: state.theme,
      filter: state.filter
  };
};

const mapDispatch = dispatch => {
  return {
    addFilter(filter) {
      dispatch(changeFilter(filter))
    }
  }
}


export default withRouter(connect(mapState, mapDispatch)(Favorites));

