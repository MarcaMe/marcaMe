const defaultColor = 'teal'

const CHANGE_THEME = 'CHANGE_THEME';

export const changeColor = color => ({ type: CHANGE_THEME, color})


export default function(state = defaultColor, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return action.color;
    default:
      return state;
  }
}
