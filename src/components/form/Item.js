import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormDataContext } from './Form'

export default function Item(props) {

  const formData = useContext(FormDataContext)

  const [value, setValue] = useState(props.defaultValue)

  console.log(props.error)

  return (
    <div>
      {
        React.cloneElement(
          props.children,
          {
            onChange: (e) => {
              const value = e.target.value
              setValue(value)
              formData.set(props.fieldName, value)
            },
            value: value
          }
        )
      }
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