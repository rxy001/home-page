import React, { useRef, useState, useReducer, useCallback } from 'react'
import schema from 'async-validator';

export const FormDataContext = React.createContext({})

const createRules = (children) => {
  const rules = {}
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && Array.isArray(child.props.rules)) {
      const { fieldName, rules: childRules } = child.props
      rules[fieldName] = childRules
    }
  })
  return rules
}



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

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    const validator = new schema(createRules(props.children));
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
  }, [props.onSubmit])

  const renderFormItem = useCallback((children) => {
    return React.Children.map(children, (child) => {
      const fieldName = child.props.fieldName
      const error = fieldName ? errors[fieldName] : void 233
      return (
        React.cloneElement(child, { error })
      )
    })
  }, [errors])

  return (
    <form onSubmit={onSubmit} target='_blank'>
      <FormDataContext.Provider value={self.current.formData}>
        {renderFormItem(props.children)}
      </FormDataContext.Provider>
    </form>
  )
}
