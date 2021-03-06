import React, { useEffect, useRef, useCallback } from 'react'
import './css/animation.style.css'

export default function Wave(props) {

  const ref = useRef(null)
  const self = useRef({})

  const getAttributeName = useCallback(() => {
    return 'click-animating-without-extra-node';
  }, [])

  const resetEffect = useCallback((node, onAnimationStart, onAnimationEnd) => {
    const attrName = getAttributeName()
    node.setAttribute(attrName, 'false')
    node.removeEventListener('animationstart', onAnimationStart, false)
    node.removeEventListener('animationend', onAnimationEnd, false)
  }, [])

  const onAnimationStart = useCallback((e) => {
    if (!e || e.animationName !== 'waveEffect') {
      return;
    }
  }, [])

  const onAnimationEnd = useCallback((e) => {
    if (!e || e.animationName !== 'fadeEffect') {
      return;
    }
    resetEffect(e.target, onAnimationStart, onAnimationEnd)
  }, [])

  const onClick = useCallback((node, onAnimationStart, onAnimationEnd) => {
    const attrName = getAttributeName()
    node.setAttribute(attrName, 'true')

    node.addEventListener('animationstart', onAnimationStart)
    node.addEventListener('animationend', onAnimationEnd)
  }, [])

  const bindAnimationEvent = useCallback((node) => {
    const listener = (e) => {
      resetEffect(node, onAnimationStart, onAnimationEnd)

      // https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Tips
      window.requestAnimationFrame(() => {
        self.current.requestID && window.cancelAnimationFrame(self.current.requestID)
        self.current.requestID = window.requestAnimationFrame(() => {
          onClick(node, onAnimationStart, onAnimationEnd)
        })
      })
    }

    node.addEventListener('click', listener)

    return () => {
      node.removeEventListener('click', listener)
    }
  }, [])

  useEffect(() => {
    const node = ref.current
    const removeEventListener = bindAnimationEvent(node)
    return removeEventListener
  }, [ref.current])

  useEffect(() => {
    return () => {
      if (self.current.requestID) {
        window.cancelAnimationFrame(self.current.requestID)
        self.current.requestID = null
      }
    }
  }, [])

  return (
    React.cloneElement(
      props.children,
      {
        ref: ref
      },
    )
  )
}