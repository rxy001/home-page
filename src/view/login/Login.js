import React from 'react'
import { Modal, Input, Form, Button } from 'components'

export default function (props) {
  return (
    <Modal visible={props.visible} onCancel={props.onCancel} width={500} footer={null} destroyOnClose>
      <div style={{ padding: '20px 0' }}>
        <Form onSubmit={props.onSubmit}>
          <Form.Item fieldName='username' rules={[
            {
              required: true,
              message: '请输入账号',
            },
          ]}>
            <Input style={{ width: 250 }} placeholder='账号' />
          </Form.Item>
          <Form.Item fieldName='password' rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}>
            <Input style={{ width: 250 }} placeholder='密码' type='password' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary' style={{ width: 250, height: 35 }}>登录</Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}