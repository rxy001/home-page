import React from 'react'
import { Button } from 'components'
import './css/menu.css'

export default function Menu(props) {

  const options = {
    主页: () => {
    },
    文章: () => { },
    相册: () => {
    },
  }

  const renderItem = (title, onClick) => {
    return <div key={title} onClick={onClick} className='home-page-menu-item'>{title}</div>
  }

  return (
    <div className='home-page-menu'>
      {Object.entries(options).map((option) => {
        return (
          renderItem(...option)
        )
      })}
    </div>
  )
}