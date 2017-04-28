import React, {PropTypes} from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import DemoBarChart from '../containers/DemoBarChart'
import DemoPieChart from '../containers/DemoPieChart'
import DemoScatterPlot from '../containers/DemoScatterPlot'
import DemoChat from '../containers/DemoChat'

const {string, object, func, arrayOf} = PropTypes

const Row = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
`

const Dashboard = React.createClass({
  propTypes: {
    className: string, // for styled components
    incrementRenderCount: func
  },
  componentDidMount () {
    this.props.incrementRenderCount('component')
  },
  componentDidUpdate (prevProps, prevState) {
    this.props.incrementRenderCount('component')
  },
  render () {
    return (
      <div className={`dashboard ${this.props.className}`}>
        <Row>
          <DemoBarChart
            width={window.innerWidth / 2 - 10}
            height={window.innerHeight / 2}
          />
          <DemoScatterPlot
            width={window.innerWidth / 2 - 10}
            height={window.innerHeight / 2}
          />
        </Row>
        <Row>
          <DemoPieChart
            width={window.innerWidth / 3}
            height={window.innerHeight / 3}
          />
          <DemoChat
            width={window.innerWidth * 2 / 3 - 100}
            height={window.innerHeight / 2}
          />
        </Row>
      </div>
    )
  }
})

const generateDataGroupCSS = props => {
  return _.reduce(
    props.colors,
    (result, color, user) => {
      result += `.data-group-${user} { fill: ${color}; }`
      return result
    },
    ''
  )
}

const generateHoverCss = letter =>
  `
  .data-${letter} {
    opacity: 1;
    -webkit-transition: opacity .2s ease-in;
  }
`

const StyledDashboard = styled(Dashboard)`
  ${props => generateDataGroupCSS(props)}
  .data {
    opacity: ${props => (props.hover ? 0.25 : 1)};
    -webkit-transition: opacity .2s ease-in;
  }
  ${props => props.hover && props.hover.map(letter => generateHoverCss(letter))}
  .tooltip {
    position: absolute;
    z-index: 10;
    display: inline-block;
    border: solid 1px grey;
    border-radius: 2px;
    padding: 5px;
    color: grey;
    background-color: rgba(255, 255, 255, 0.75);
    text-align: center;
  }
`

StyledDashboard.propTypes = {
  colors: object,
  hover: arrayOf(string)
}

export default StyledDashboard