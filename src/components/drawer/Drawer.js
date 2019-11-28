import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'

export default function Drawer(props) {
  const [visible, setVisible] = useState(false)
  const barRef = useRef(null)
  const childrenRef = useRef(null)

  const { placement, duration, showThresholds, children, afterVisibleChange } = props

  useEffect(() => {
    const callback = (e) => {
      const mouseX = e.clientX
      const mouseY = e.clientY

      let mouseNum = mouseX
      let closeThresholds = childrenRef.current.offsetWidth
      let targetNum = e.currentTarget.offsetWidth
      switch (placement) {
        case 'top':
          mouseNum = mouseY
          closeThresholds = childrenRef.current.offsetHeight
        case 'left':
          break;
        case 'bottom':
          mouseNum = mouseY
          closeThresholds = childrenRef.current.offsetHeight
          targetNum = e.currentTarget.offsetHeight
        case 'right':
          mouseNum = targetNum - mouseNum
          break
      }
      if (mouseNum <= showThresholds) {
        setVisible(true)
      } else if (mouseNum >= closeThresholds + 20) {
        setVisible(false)
      }
    }
    document.body.addEventListener('mousemove', callback)

    return () => {
      document.body.removeEventListener('mousemove', callback)
    }
  }, [childrenRef])

  const defaultStyle = useMemo(() => ({
    transition: `${placement} ${duration}ms ease-in-out`,
    [placement]: '-100%',
    width: ['top', 'bottom'].includes(placement) ? '100%' : 'auto',
    height: ['left', 'right'].includes(placement) ? '100%' : 'auto',
    background: '#d2d2d238',
    position: 'fixed',
    overflow: 'hidden'
  }), [placement, duration])

  const transitionStyles = useMemo(() => ({
    entering: { [placement]: 0 },
    entered: { [placement]: 0 },
    exiting: { [placement]: '-100%' },
    exited: { [placement]: '-100%' },
  }), [placement])

  const renderChildren = useCallback(() => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref: childrenRef
      })
    }
    return (
      <div ref={childrenRef}></div>
    )
  }, [children])

  const visibleChange = useCallback(() => {
    if (typeof afterVisibleChange === 'function') {
      afterVisibleChange(visible)
    }
  }, [afterVisibleChange, visible])

  console.log('render')

  return (
    <Transition
      onEntered={visibleChange}
      onExited={visibleChange}
      in={visible}
      timeout={150}
    >
      {state => (
        <div
          ref={barRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
          {
            renderChildren()
          }
        </div>
      )}
    </Transition>
  )
}

Drawer.propTypes = {
  placement: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  duration: PropTypes.number,
  showThresholds: PropTypes.number,
  afterVisibleChange: PropTypes.func
}

Drawer.defaultProps = {
  placement: 'top',
  duration: 200,
  showThresholds: 20
}