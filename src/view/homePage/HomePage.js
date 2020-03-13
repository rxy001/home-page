import React from 'react'
import './css/homepage.css'
export default function (props) {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <img src={require('../../assets/avatar.jpeg')} className='homepage-avatar' />
        <div className='homepage-intro'>
          <span>个人简介：</span>
          <span>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
        </div>
      </div>
    </div>
  )
}