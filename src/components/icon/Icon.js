import React from 'react'
import Proptypes from 'prop-types'
import './style.css'

export default function Icon(props) {
  return <span className={`custom-icon iconfont ${props.type}`} style={props.style} onClick={props.onClick} />
}

Icon.propTypes = {
  type: Proptypes.string.isRequired,
  onClick: Proptypes.func,
  style: Proptypes.object
}

Icon.defaultProps = {
  onClick: () => { },
  style: {}
}
