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

  const horizontal = useMemo(() => {
    if (['top', 'bottom'].includes(placement)) {
      return false
    } else if (['left', 'right'].includes(placement)) {
      return true
    }
  }, [placement])

  const translate = useCallback((dis) => {
    return `translate${horizontal ? 'X' : 'Y'}(${dis})`
  }, [horizontal])

  const initialDis = useCallback((placement) => {
    switch (placement) {
      case 'left':
      case 'top':
        return '-100%';
      case 'right':
      case 'bottom':
        return '100%'
    }
  }, [])

  const defaultStyle = useMemo(() => ({
    transition: `transform ${duration}ms linear`,
    [placement]: '0',
    width: horizontal ? 'auto' : '100%',
    height: horizontal ? '100%' : 'auto',
    background: '#d2d2d238',
    position: 'fixed',
    overflow: 'hidden',
    transform: translate(initialDis(placement))
  }), [placement, duration, horizontal])

  const transitionStyles = useMemo(() => ({
    entering: { transform: translate(0) },
    entered: { transform: translate(0) },
    exiting: { transform: translate(initialDis(placement)) },
    exited: { transform: translate(initialDis(placement)) },
  }), [translate, placement])

  const renderChildren = useCallback(() => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref: childrenRef
      })
    }
    return (
      <div ref={childrenRef}></div>
    )
  }, [children, childrenRef])

  const visibleChange = useCallback(() => {
    if (typeof afterVisibleChange === 'function') {
      afterVisibleChange(visible)
    }
  }, [afterVisibleChange, visible])

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
            ...transitionStyles[state],
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