import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Drawer, Modal, Upload, Button, message, Input } from 'components'
import axios from 'axios'
import './css/root.css'
import Menu from './Menu'
import Gallery from '../gallery'
import Top from './Top'
import HomePage from '../homePage'
import Articles, { Writing } from '../articles'
import {
  Switch,
  Route,
} from "react-router-dom";


export default function (props) {

  const [bgImg, setBgImg] = useState('')
  const inputRef = useRef(null)
  // const self = useRef({})

  useEffect(() => {

    axios.get('/userInfo').then((res) => {
      if (res.success === 'true') {
        res.data.backgroundImage && setBgImg('http://localhost:3001/' + res.data.backgroundImage)
      } else {
        message.info(res.msg)
      }
    }).catch((err) => {
      message.info('失败')
    })
  }, [])

  return (
    <div
      className='home-page-container'
      style={{
        backgroundImage: `url(${bgImg})`,
      }}>
      <Top bgImg={bgImg} setBgImg={setBgImg} />
      <Menu />
      <div className='home-page-content'>
        <Switch>
          <Route path="/articles" strict>
            <Articles />
          </Route>
          <Route path="/gallery" strict>
            <Gallery />
          </Route>
          <Route path="/" strict>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </div>
  )
}