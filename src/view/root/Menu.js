import React from 'react'
import { Button } from 'components'
import './css/menu.css'
import {
  Link,
} from "react-router-dom";

export default function Menu(props) {

  const options = {
    主页: '',
    文章: 'articles',
    相册: 'gallery',
  }

  const renderItem = (title, link) => {
    return <Link key={title} to={`/${link}`}> <span className='home-page-menu-item'>{title}</span></Link>
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