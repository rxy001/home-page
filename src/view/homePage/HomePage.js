import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Drawer, Button } from 'components'

export default function (props) {
  const url = 'http://b-ssl.duitang.com/uploads/item/201303/10/20130310164519_L4ZMz.jpeg'
  const inputRef = useRef(null)

  useEffect(() => {

  }, [])

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <Drawer placement='top'>
        <div style={{ height: 50, background: 'orange' }}>

        </div>
      </Drawer>
      {/* <input ref={inputRef} type='file' onChange={(e) => {
        console.log(e)
      }} />
      <Button title='button' onClick={() => {
        inputRef.current.click()
      }} /> */}
    </div>
  )
}