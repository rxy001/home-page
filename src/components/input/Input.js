import React from 'react'
import './index.css'

export default function Input(props) {
  return (
    <div>
      <input type='text' className='input_component' {...props} />
    </div>
  )
}