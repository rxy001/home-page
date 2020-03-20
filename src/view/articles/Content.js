import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './css/content.css'
import { useParams } from "react-router-dom";

export default function (props) {

  const [data, setData] = useState('')
  const divRef = useRef(null)
  const { id } = useParams()

  useEffect(() => {
    axios(`/articlContent/${id}`).then((res) => {
      setData(res.data)
      divRef.current.innerHTML = res.data.content
    })
  }, [divRef.current])

  return (
    <div style={{ overflow: 'auto', height: '100%', paddingBottom: 200 }}>
      <div className='content-wrap' >
        <img src={'/' + data.img} className='content-img' />
        <h3 className='content-title'>{data.title}</h3>
        <div className='content-basicInfo'>
          <span>{data.author}</span>
          <span>{data.createdTime}</span>
        </div>
        <div ref={divRef} />
      </div>
    </div>
  )
}