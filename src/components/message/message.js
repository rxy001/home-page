import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Transition, TransitionGroup } from 'react-transition-group';
import './message.css'
import { getUid } from '../utils'

class Messages {

  constructor() {
    this.messagesList = []
  }

  findIndex = (obj) => {
    return this.messagesList.findIndex((v) => v === obj)
  }

  close = (props, duration) => {
    if (duration === 0) {
      return
    }
    setTimeout(() => {
      const index = this.findIndex(props)
      this.messagesList[index].visible = false
      this.render()
    }, duration * 1000);
  }

  unMountMessage(props) {
    const index = this.findIndex(props)
    this.messagesList.splice(index, 1)
    this.render()
  }

  push(content, duration, config = {}) {
    let props = {
      content: content,
      visible: true,
      animationOnEntered: () => {
        this.close(props, duration)
      },
      animationOnExited: () => {
        this.unMountMessage(props)
      },
      key: getUid(),
    }
    this.messagesList.push(props)
    this.render()
  }

  info(...arge) {
    this.push(...arge)
  }

  render() {
    if (!this.div) {
      this.div = document.createElement('div')
      document.body.appendChild(this.div)
    }

    ReactDOM.render(
      <div className='message'>
        {this.messagesList.map((props) => (
          <Message
            {...props}
          />
        ))}
      </div>
      ,
      this.div)
  }
}

export default new Messages()

function Message(props) {

  const [visible, setVisible] = useState(false)
  useEffect(() => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setVisible(props.visible)
      })
    })
  }, [props.visible]);

  const duration = 200;

  const defaultStyle = {
    // transform: 'translateY(-40%)',
  }

  const transitionStyles = {
    entering: {
      transition: `transform ${duration}ms linear`,
      transform: 'translateY(0)',
      position: 'relative',
      zIndex: -1,
    },
    entered: {
      transform: 'translateY(0)',
    },
    exiting: {
      transition: `transform ${duration}ms linear`,
      transform: 'translateY(-100%)'
    },
    exited: { transform: 'translateY(-40%)' },
  };

  return (
    <Transition
      in={visible}
      timeout={duration}
      onEntered={props.animationOnEntered}
      onExited={props.animationOnExited}
    >
      {state => (
        <div className='meesage-container'
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
          <div className='message-content'>
            {props.content}
          </div>
        </div>
      )}
    </Transition>
  )
}