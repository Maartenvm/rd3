import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import themes from '../utils/themes'
import {selectTheme} from '../actions'

const {func} = PropTypes

const List = styled.ul`
  position: absolute;
  bottom: 5px;
  right: 5px;
  margin: 0 8px 3px 0;
`

const Item = styled.li`
  display: inline;
  margin-left: 5px;
  cursor: pointer;
`

class ThemePicker extends Component {
  handleSelectTheme = theme => e => {
    this.props.selectTheme(theme)
  }
  
  render () {
    return (
      <List>
        {_.keys(themes).map(theme => (
          <Item key={theme} onClick={this.handleSelectTheme(theme)}>
            {theme}
          </Item>
        ))}
      </List>
    )
  }
}

ThemePicker.propTypes = {
  selectTheme: func
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectTheme: theme => {
      dispatch(selectTheme(theme))
    }
  }
}

export default connect(null, mapDispatchToProps)(ThemePicker)
