import React, { useCallback, useState } from 'react'
import './css/root.css'
import { Drawer, Modal, Upload, Button, message, Input } from 'components'
import Login from '../login'
import axios from 'axios'

export default function (props) {
  const [visible, setVisible] = useState(false)

  const beforeUpload = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = function (e) {
        const prevBgImg = props.bgImg
        props.setBgImg(e.target.result)
        Modal.confirm({
          title: '是否上传该背景图片?',
          onOk: () => {
            resolve()
          },
          onCancel: () => {
            props.setBgImg(prevBgImg)
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

  const onSubmit = (e) => {
    axios.post('/login', {
      ...e,
    }).then(() => {
      cancel()
    })
  }

  const cancel = () => {
    setVisible(false)
  }

  return (
    <div>
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
              setVisible(true)
            }}
          >
            登录
          </Button>
        </div>
      </Drawer>
      <Login
        visible={visible}
        onCancel={cancel}
        onSubmit={onSubmit}
      />
    </div>
  )
}