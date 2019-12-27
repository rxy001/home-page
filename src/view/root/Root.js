import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Drawer, Modal, Upload, Button, message, Input } from 'components'
import axios from 'axios'
import './css/root.css'
import { useHistory } from "react-router-dom";
import Menu from './Menu'
import Gallery from '../gallery'

export default function (props) {

  const history = useHistory()

  const [bgImg, setBgImg] = useState('')
  const inputRef = useRef(null)
  const [visible, setVisible] = useState(false)
  // const self = useRef({})

  useEffect(() => {
    axios.get('/userInfo').then((res) => {
      if (res.success === 'true') {
        res.data.backgroundImage && setBgImg('http://localhost:3001/' + res.data.backgroundImage)
      }
    })
  }, [])

  const beforeUpload = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = function (e) {
        const prevBgImg = bgImg
        setBgImg(e.target.result)
        Modal.confirm({
          title: '是否上传该背景图片?',
          onOk: () => {
            resolve()
          },
          onCancel: () => {
            setBgImg(prevBgImg)
            reject()
          },
          top: 50,
          okText: '确定',
          cancelText: '取消',
          mask: false
        })
      }
      reader.readAsDataURL(file);
    })
  })

  return (
    <div
      className='home-page-container'
      style={{
        backgroundImage: `url(${require("../../assets/79547_top.jpg")})`,
      }}>
      <Drawer placement='top'>
        <div className='top-container'>
          <Upload
            method='put'
            action='http://localhost:3001/userInfo'
            name='backgroundImage'
            beforeUpload={beforeUpload}
          >
            <Button
              type='borderless'
              style={{ color: 'red' }}
            >
              更换背景
            </Button>
          </Upload>
          <Button
            type='borderless'
            style={{ color: 'red' }}
            onClick={() => {
              // history.push('/login')
            }}
          >
            登录
          </Button>
        </div>
      </Drawer>
      <Menu />
      <div className='home-page-content'>
        <div style={{ background: '#fff', height: 100 }}>
          <Gallery />
        </div>
      </div>
    </div>
  )
}