import React, { useCallback, useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { Button } from '../'
import PropTypes from 'prop-types'
import { Transition, TransitionGroup } from 'react-transition-group';
import './css/modal.css'

const duration = 300;
export default function Modal(props) {

  const [modalContainerClassName, setModalContainerClassName] = useState('modal-hidden')
  const [animation, setAnimation] = useState(false)
  const [destroyChildren, setDestroyChildren] = useState(false)
  const self = useRef({})

  const renderCloseIcon = useCallback(() => {
    const { closable, onCancel } = props
    return (
      closable ? <Button
        type='borderless'
        icon='iconclose-hei'
        onClick={onCancel}
        style={{
          position: 'absolute',
          right: 5,
          top: 5,
          fontSize: 12,
          padding: 0
        }}
      /> : null
    )
  }, [props.closable, props.onCancel])

  const renderHeader = useCallback(() => {
    if (props.title) {
      return (
        <div className='modal-header'>
          <span className='modal-title'>
            {props.title}
          </span>
        </div>
      )
    }
  }, [props.title])

  const renderBody = useCallback(() => {
    return (
      <div className='modal-body'>
        {props.children}
      </div>
    )
  }, [props.children])

  const renderFooter = useCallback(() => {
    const { footer, okText, cancelText, onCancel, onOk } = props
    let footerNode
    if (footer === null) {
      return
    } else if (typeof footer === 'string' || React.isValidElement(footer)) {
      footerNode = footer
    } else {
      footerNode = (
        <div>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button onClick={onOk} type='primary' style={{ marginLeft: 10 }}>{okText}</Button>
        </div>
      )
    }
    return (
      <div className='modal-footer'>
        {footerNode}
      </div>
    )
  }, [props.footer, props.okText, props.cancelText, props.onCancel, props.onOk])

  const getMaskElement = useCallback(() => {
    const defaultStyle = {
      transition: `opacity ${duration}ms ease`,
      opacity: 0,
    }
    const transitionStyles = {
      entering: { opacity: 1 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
    };

    const { mask, onCancel } = props

    return mask ? (
      <Transition
        in={animation}
        timeout={duration}
      >
        {state => (
          <div
            className='modal-mask'
            onClick={onCancel}
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}>
          </div>
        )}
      </Transition>
    ) : null
  }, [props.mask, props.onCancel, animation])

  const getModalElement = useCallback(() => {
    const { width, top, mask, maskClosable, onCancel } = props

    const defaultStyle = {
      transition: `transform ${duration}ms ease`,
      transform: 'scale(0)',
      width: width,
      top: top
    }

    const transitionStyles = {
      entering: { transform: 'scale(1)' },
      entered: { transform: 'scale(1)' },
      exiting: { transform: 'scale(0)' },
      exited: { transform: 'scale(0)' },
    };

    const click = (e) => {
      if (
        mask
        && maskClosable
        && self.current.entered
        && e.target.className === 'modal-wrap'
      ) {
        onCancel()
      }
    }
    const onEntered = () => {
      self.current.entered = true
      setDestroyChildren(false)
    }
    const onExited = () => {
      self.current.entered = false
      setModalContainerClassName('modal-hidden')
      setDestroyChildren(props.destroyOnClose)
      props.afterClose()
    }
    return (
      <Transition
        in={animation}
        timeout={duration}
        onEntered={onEntered}
        onExited={onExited}
      >
        {state => (
          <div
            className='modal-wrap'
            onClick={click}
          >
            <div
              className='modal'
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
              <div className='modal-content'>
                {renderCloseIcon()}
                {renderHeader()}
                {renderBody()}
                {renderFooter()}
              </div>
            </div>
          </div>
        )}
      </Transition>
    )
  })

  useEffect(() => {
    const { visible } = props
    if (visible) {
      setModalContainerClassName('')
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimation(visible)
      })
    })
  }, [props.visible])

  return ReactDOM.createPortal((
    <div className={`modal-container ${modalContainerClassName}`}>
      {
        props.visible || !destroyChildren ? (
          <React.Fragment>
            {getMaskElement()}
            {getModalElement()}
          </React.Fragment>
        ) : null
      }
    </div>
  ), document.body)
}

Modal.propTypes = {
  title: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  afterClose: PropTypes.func,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  closable: PropTypes.bool,
  mask: PropTypes.bool,
  visible: PropTypes.bool,
  destroyOnClose: PropTypes.bool,
  maskClosable: PropTypes.bool,
  footer: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.elementType
  ]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Modal.defaultProps = {
  closable: true,
  okText: '确定',
  cancelText: '取消',
  onCancel: () => { },
  onOk: () => { },
  mask: true,
  visible: false,
  destroyOnClose: false,
  maskClosable: true,
  afterClose: () => { },
  width: 500,
  top: 100
}