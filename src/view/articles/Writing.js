import React, { useState, useRef, useCallback } from 'react'
import { Upload, Button } from 'components'
import './css/writing.css'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import axios from 'axios'

export default function (props) {

  const [editorState, handleChange] = useState(BraftEditor.createEditorState(null))
  const [bgImg, setBgImg] = useState('')
  const spanRef = useRef(null)
  const [title, setTitle] = useState('')

  const editorControls = [
    'font-size', 'font-family', 'bold', 'italic', 'text-indent', 'link', 'headings', 'list-ul', 'list-ol',
    'blockquote', 'code', 'separator', 'text-align', 'media', 'clear'
  ]

  const beforeUpload = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = function (e) {
      setBgImg(e.target.result)
    }
    reader.readAsDataURL(file);
    return false
  }, [])

  const onKeyDown = useCallback((e) => {
    if (e.keyCode == 13) {
      // 避免回车键换行
      e.preventDefault();
    }
  }, [])

  const onChange = useCallback((e) => {
    const value = e.target.value
    spanRef.current.innerText = value
    setTitle(value)
  }, [spanRef.current])

  const renderBgImg = () => {
    return (
      bgImg ?
        <div style={{ position: 'relative' }}>
          <img src={bgImg} style={{ width: '100%', display: 'block' }} />
          <div className='writing-editWarpper'>
            <Upload beforeUpload={beforeUpload}>
              <span>更换</span>
            </Upload>
            <span
              onClick={() => {
                setBgImg('')
              }}
            >
              删除
            </span>
          </div>
        </div> :
        <Upload
          beforeUpload={beforeUpload}
        >
          <div className='writing-upload'>
            <span>添加题图</span>
          </div>
        </Upload>
    )
  }

  return (
    <div style={{ overflow: 'auto', height: '100%' }}>
      <div style={{ width: 660, margin: '0 auto' }}>
        <div className='writing-cover-wrapper'>
          {renderBgImg()}
        </div>
        <div className='writing-title-wrapper'>
          <pre className='writing-pre'><span ref={spanRef} /><br /></pre>
          <textarea
            onKeyDown={onKeyDown}
            onChange={onChange}
            value={title}
            className='writing-title-input'
            placeholder='请输入标题（最多 50 个字）' />
        </div>
        <BraftEditor
          value={editorState}
          onChange={handleChange}
          controls={editorControls}
          contentStyle={{
            height: 'auto',
            minHeight: 500
          }}
        />
        <Button onClick={() => {
          axios.post('/articles', {
            content: editorState.toHTML(),
            intro: editorState.toText().slice(0, 300),
            title,
            img: '',
            author: 'rxy',
            createdTime: new Date().toLocaleDateString()
          }).then(() => {

          })
        }}>
          commit
      </Button>
      </div>
    </div>
  )
}