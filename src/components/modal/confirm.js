import React, { useCallback } from 'react'
import ReactDOM from 'react-dom'
import Modal from './Modal'
import PropTypes from 'prop-types'
import { Button } from '../index'
import './css/confirm.css'

export default function confirm(config) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div)
    if (unmountResult && div.parentElement) {
      div.parentElement.removeChild(div)
    }
  }

  function close() {
    render({
      ...config,
      visible: false,
      afterClose: destroy
    })
  }

  function render(props) {
    ReactDOM.render(<Confirm {...props} />, div)
  }

  render({
    ...config,
    visible: true,
    close: close,
  })
}

function Confirm(props) {
  const onCancel = useCallback((e) => {
    props.onCancel(e)
    props.close()
  }, [props.onCancel, props.close])

  const onOk = useCallback((e) => {
    props.onOk(e)
    props.close()
  }, [props.onOk, props.close])

  const renderButtonGroup = useCallback(() => {
    return (
      <div className='confirm-button-group'>
        <Button onClick={onCancel}>{props.cancelText}</Button>
        <Button
          type='primary'
          onClick={onOk}>
          {props.okText}
        </Button>
      </div>
    )
  }, [onCancel, onOk, props.okText, props.cancelText])

  return (
    <Modal
      maskClosable={false}
      {...props}
      footer={null}
      onCancel={onCancel}
      title={null}
    >
      <div className='confirm-container'>
        {props.title ?
          (<div className='confirm-title'>
            {props.title}
          </div>)
          : null}
        {props.content ?
          (<div className='confirm-content'>
            {props.content}
          </div>)
          : null}
      </div>
      {renderButtonGroup()}
    </Modal>
  )
}

Confirm.propTypes = {
  onOk: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
}

Confirm.defaultProps = {
  onOk: () => { },
  onCancel: () => { },
  close: () => { },
  content: '',
  title: '',
  okText: '确定',
  cancelText: '取消'
}