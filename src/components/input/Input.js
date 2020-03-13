import React from 'react'
import './index.css'

export default function Input({ className, ...props }) {
  return (
    <input type='text' className={`input_component ${className || ''}`} {...props} />
  )
}