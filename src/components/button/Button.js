import React, { useCallback, useMemo } from 'react'
import styles from './css/sytle.module.css'
import PropTypes from 'prop-types'
import Wave from './Wave'
import { Icon } from '../'

export default function Button(props) {

  const { disabled, style, onClick, type, icon, children, ...otherProps } = props

  const iconNode = useMemo(() => {
    return icon ? <Icon type={icon} /> : ''
  }, [icon])

  return (
    <Wave>
      <button {...otherProps} style={style} disabled={disabled} className={`${styles['btn-container']} ${styles[type]} btn`} onClick={onClick}>
        {iconNode}
        {React.createElement('span', {}, children)}
      </button>
    </Wave>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.oneOf(['primary', 'default'])
}

Button.defaultProps = {
  onClick: () => { },
  disabled: false,
  style: {},
  type: 'default'
}

