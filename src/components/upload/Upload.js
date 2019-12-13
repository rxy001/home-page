import React, { useRef, useCallback } from 'react'
import { Button } from '../'
import styles from './style.module.css'
import { request, getUid } from '../utils'
import PropTypes from 'prop-types'

export default function Upload(props) {
  const inputRef = useRef(null)
  const requests = useRef({})

  const btnOnClick = useCallback(() => {
    inputRef.current.click()
  }, [inputRef.current])

  const uploadFiles = useCallback((fileList) => {
    fileList.map((file) => {
      file.uid = getUid()
      return file
    }).forEach((file) => {
      upload(file, fileList)
    })
  })

  const upload = useCallback((file, fileList) => {
    const { beforeUpload } = props
    if (typeof beforeUpload !== 'function') {
      post(file)
      return
    }
    const result = beforeUpload(file, fileList)
    if (result === true) {
      post(file)
    } else if (Object.prototype.toString.call(result) === '[object Promise]') {
      result.then((processedFile) => {
        const processedFileType = Object.prototype.toString.call(processedFile)
        if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
          return post(processedFile)
        }
        post(file)
      }).catch((err) => {
        err && console.error(err)
      })
    }
  })

  const post = useCallback((file) => {
    const { action, method, headers } = props
    const options = {
      action,
      method,
      headers,
      file,
      name: file.name,
      onProgress: () => { },
      onError: () => { },
      onSuccess: () => {
        props.onSuccess(file)
      }
    }
    requests.current[file.uid] = request(options)
  })

  return (
    <Button icon='icondownload' onClick={btnOnClick} {...props.buttonProps}>
      <div className={styles['upload-container']}>
        <span>上传</span>
        <input className={styles.fileInput} multiple={props.multiple} ref={inputRef} type='file' onChange={(e) => {
          uploadFiles(Array.from(e.target.files))
        }} />
      </div>
    </Button>
  )
}

Upload.propTypes = {
  multiple: PropTypes.bool,
  action: PropTypes.string.isRequired,
  method: PropTypes.string,
  headers: PropTypes.object,
  onSuccess: PropTypes.func,
  beforeUpload: PropTypes.func,
  buttonProps: PropTypes.object
}
Upload.defaultProps = {
  multiple: false,
  onSuccess: () => { },
  method: 'post',
  headers: null,
  buttonProps: {}
}