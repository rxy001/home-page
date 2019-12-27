import React, { useCallback } from 'react'
import { Upload, Button } from 'components'
import './css/gallery.css'
import CreateAlbum from './CreateAlbum'

export default function (props) {

  const createAlbum = useCallback(() => {

  })

  return (
    <div className='gallery-contaier'>
      <div>
        <div>
          相册
          照片
          视频
        </div>
        <Button type='primary'>上传图片/视频</Button>
        <Button style={{ marginLeft: 10 }} onClick={createAlbum}>创建相册</Button>
      </div>
      <CreateAlbum />
    </div>
  )
}