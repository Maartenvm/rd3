import {combineReducers} from 'redux-immutable'
import {fromJS} from 'immutable'
import {
  NEW_TEXT,
  SET_HOVER,
  TICK,
  SET_COLOR,
  INCREMENT_RENDER_COUNT,
  PIECHART_TOGGLE_FILTER,
  SELECT_THEME
} from './constants'

export const initialState = fromJS({
  text: {},
  colors: {
    user1: 'blue',
    user2: 'orange'
  },
  hover: null,
  tick: 0,
  renderCount: {},
  piechartFilterEnabled: true,
  theme: 'dark'
})

// ACTION REDUCER
function newText (state, action) {
  return state.mergeDeep(fromJS(action.text))
}

function setHover (state, action) {
  return fromJS(action.letters)
}

function incrementTick (state, action) {
  return state + 1
}

function setColor (state, action) {
  return state.set(action.user, action.color)
}

function incrementRenderCount (state, action) {
  return state.updateIn(
    [action.component, action.mode],
    (value = 0) => value + 1
  )
}

function piechartToggleFilter (state, action) {
  return !state
}

function selectTheme (state, action) {
  return action.theme
}

// TOP LEVEL REDUCERS
function text (state, action) {
  switch (action.type) {
    case NEW_TEXT:
      return newText(state, action)
    default:
      return state
  }
}

function colors (state, action) {
  switch (action.type) {
    case SET_COLOR:
      return setColor(state, action)
    default:
      return state
  }
}

function hover (state, action) {
  switch (action.type) {
    case SET_HOVER:
      return setHover(state, action)
    default:
      return state
  }
}

function tick (state, action) {
  switch (action.type) {
    case TICK:
      return incrementTick(state, action)
    default:
      return state
  }
}

function renderCount (state, action) {
  switch (action.type) {
    case INCREMENT_RENDER_COUNT:
      return incrementRenderCount(state, action)
    default:
      return state
  }
}

function piechartFilterEnabled (state, action) {
  switch (action.type) {
    case PIECHART_TOGGLE_FILTER:
      return piechartToggleFilter(state, action)
    default:
      return state
  }
}

function theme (state, action) {
  switch (action.type) {
    case SELECT_THEME:
      return selectTheme(state, action)
    default:
      return state
  }
}

export default combineReducers(
  {text, colors, hover, tick, renderCount, piechartFilterEnabled, theme},
  initialState
)
