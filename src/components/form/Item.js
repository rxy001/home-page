import React, { useContext, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FormDataContext } from './Form'
import './index.css'

const renderLabel = (label) => {
  return label ?
    <div className='form_item_label'>
      {label + ':'}
    </div>
    : null
}

const renderErrorMsg = (error) => {
  if (error && typeof error === 'string') {
    return <div className='error_msg'>{error}</div>
  }
}

export default function Item(props) {
  const { children, error, fieldName, defaultValue, label } = props

  const formData = useContext(FormDataContext)

  const [value, setValue] = useState(defaultValue)

  const renderContent = useCallback(() => {
    return React.Children.count(children) > 1 ? children : React.cloneElement(
      children,
      {
        onChange: (e) => {
          const value = e.target.value
          setValue(value)
          formData.set(fieldName, value)
        },
        value: value,
        className: error ? 'input_component_error' : '',
      }
    )
  }, [value, children, formData, error, fieldName])

  return (
    <div className='form_item'>
      {renderLabel(label)}
      <div className='form_item_content' style={{ marginLeft: label ? 0 : 100 }}>
        {renderContent()}
        {renderErrorMsg(error)}
      </div>
    </div>
  )
}

Item.propTypes = {
  label: PropTypes.string,
  fieldName: PropTypes.string,
  error: PropTypes.string,
  rules: PropTypes.array,
}

Item.defaultProps = {
  defaultValue: ''
}