import React, {PropTypes} from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import {transparentize} from 'polished'

const {number, object, string, shape} = PropTypes

const CodeBlock = styled.pre`
  position: absolute;
  top: 0;
  right: 0;
  padding: 15px;
  margin: 5px;
  border: dashed 2px ${props => props.theme.secondaryColor};
  color: ${props => props.theme.secondaryColor};
  background-color: ${props => transparentize(0.2, props.theme.secondaryBackground)};
`

const RenderCount = props => {
  return (
    <div>
      {props.component}
      :
      {' '}
      {props.counts.component}
      {props.counts.d3 ? ' / ' + props.counts.d3 : ''}
    </div>
  )
}

RenderCount.propTypes = {
  component: string,
  counts: shape({
    component: number,
    d3: number
  })
}

const Ticker = props => {
  return (
    <CodeBlock>
      <div>tick: {props.tick}</div>
      {_.values(
        _.mapValues(props.renderCount, (counts, component) => {
          return (
            <RenderCount
              key={component}
              component={component}
              counts={counts}
            />
          )
        })
      )}
    </CodeBlock>
  )
}

Ticker.propTypes = {
  tick: number,
  renderCount: object
}

export default Ticker
