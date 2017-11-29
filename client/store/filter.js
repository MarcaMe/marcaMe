const defaultColor = ''

const CHANGE_FILTER = 'CHANGE_FILTER';

export const changeFilter = filter => ({ type: CHANGE_FILTER, filter})


export default function(state = defaultColor, action) {
  switch (action.type) {
    case CHANGE_FILTER:
      return action.filter;
    default:
      return state;
  }
}
