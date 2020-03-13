import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormDataContext } from './Form'
import './index.css'

export default function Item(props) {

  const formData = useContext(FormDataContext)

  const [value, setValue] = useState(props.defaultValue)

  return (
    <div className='form_item'>
      {
        props.label ?
          <div className='form_item_label'>
            {props.label + ':'}
          </div>
          : null
      }
      <div className='form_item_content' style={{ marginLeft: props.label ? 0 : 100 }}>
        {
          React.Children.count(props.children) > 1 ? props.children : React.cloneElement(
            props.children,
            {
              onChange: (e) => {
                const value = e.target.value
                setValue(value)
                formData.set(props.fieldName, value)
              },
              value: value,
              className: props.error ? 'input_component_error' : '',
            }
          )
        }
        {props.error && <div className='error_msg'>{props.error}</div>}
      </div>
    </div>
  )
}

Item.propTypes = {
  label: PropTypes.string,
  fieldName: PropTypes.string,
  rules: PropTypes.array,
}

Item.defaultProps = {
  defaultValue: ''
}