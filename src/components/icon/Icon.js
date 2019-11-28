import React from 'react'
import Proptypes from 'prop-types'
import './style.css'

export default function Icon(props) {
  return <span className={`custom-icon iconfont ${props.type}`} />
}

Icon.propTypes = {
  type: Proptypes.string.isRequired
}

