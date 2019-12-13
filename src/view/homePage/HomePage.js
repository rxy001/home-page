import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Drawer, Upload, Modal, Button } from 'components'

export default function (props) {

  const [bgcImg, setBgcImg] = useState('http://b-ssl.duitang.com/uploads/item/201303/10/20130310164519_L4ZMz.jpeg')
  const inputRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {

  }, [])

  const beforeUpload = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = function (e) {
        setBgcImg(e.target.result)
        Modal.confirm({
          title: '是否上传该背景图片?',
          onOk: () => {
            resolve()
          },
          onCancel: () => {
            reject()
          },
          top: 50,
          okText: '确定',
          cancelText: '取消',
          mask: false
        })
      }
      reader.onerror = function (e) {
        
      }
      reader.readAsDataURL(file);
    })
  })

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundImage: `url(${bgcImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Drawer placement='top'>
        <div style={{ height: 40 }}>
          <Upload
            action='1232'
            buttonProps={{
              type: 'borderless',
              icon: ''
            }}
            beforeUpload={beforeUpload}
          />
        </div>
      </Drawer>
    </div>
  )
}