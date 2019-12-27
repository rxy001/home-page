import React from 'react'
import { Modal, Input, Form, Button } from 'components'

export default function (props) {
  return (
    <div>
      <Modal visible>
        <Form onSubmit={(e) => { }}>
          <Form.Item fieldName='name' rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item fieldName='name2'>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit'>submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}