import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Drawer } from 'yasuo'

export default function (props) {
  const url = 'http://b-ssl.duitang.com/uploads/item/201303/10/20130310164519_L4ZMz.jpeg'
  const self = useRef({})

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
      <Drawer />
    </div>
  )
}