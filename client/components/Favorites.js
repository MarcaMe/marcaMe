import React from 'react';
import { connect } from 'react-redux';
import { Icon, Label } from 'semantic-ui-react';
import { withRouter, NavLink } from 'react-router-dom';
import { changeFilter } from '../store';

export const Favorites = (props) => {
  const { theme, addFilter } = props
  return (
    <div>
      <div className="folder collection">
      <NavLink to="/favorites" onClick={() => addFilter('favorites')}>
        <Icon name="favorite" color={theme} size="big" />
        <Label basic size="small" onClick={() => addFilter('favorites')}>Favorites</Label>
      </NavLink>
      </div>
      <div className="folder collection" >
        <NavLink to="/archived" onClick={() => addFilter('archived')}>
          <Icon name="archive" color={theme} size="big" />
          <Label basic size="small">Archive</Label>
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

