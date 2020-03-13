import React, { useRef, useState, useCallback } from 'react'
import schema from 'async-validator';

export const FormDataContext = React.createContext({})

export default function Form(props) {

  const [errors, setError] = useState({})

  const self = useRef({
    formData: {
      data: {},
      set: function (key, value) {
        this.data[key] = value
      }
    },
  })

  const createRules = () => {
    const rules = {}
    React.Children.forEach(props.children, (child) => {
      if (React.isValidElement(child) && Array.isArray(child.props.rules)) {
        const { fieldName, rules: childRules } = child.props
        rules[fieldName] = childRules
      }
    })
    return rules
  }

  const onSubmit = (e) => {

    e.preventDefault()

    const validator = new schema(createRules());

    validator.validate(self.current.formData.data, (errors, fields) => {
      if (errors) {
        setError(errors.reduce((obj, err) => {
          obj[err.field] = err.message
          return obj
        }, {}))
      } else {
        setError({})
        props.onSubmit(self.current.formData.data)
      }
    });
  }

  return (
    <form onSubmit={onSubmit} target='_blank'>
      <FormDataContext.Provider value={self.current.formData}>
        {React.Children.map(props.children, (child) => {
          const fieldName = child.props.fieldName
          const error = fieldName ? errors[fieldName] : void 233
          return (
            React.cloneElement(child, { error })
          )
        })}
      </FormDataContext.Provider>
    </form>
  )
}
