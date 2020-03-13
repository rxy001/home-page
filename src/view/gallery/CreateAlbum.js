import React from 'react'
import { Modal, Input, Form, Button } from 'components'

export default function (props) {
  return (
    <div>
      <Modal visible={props.visible} onCancel={props.onCancel}>
        <Form onSubmit={(e) => { }}>
          <Form.Item label='相册名称' fieldName='name' rules={[
            {
              required: true,
              message: '请输入相册名称',
            },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item label='相册描述' fieldName='description'>
            <Input />
          </Form.Item>
          <Form.Item>
              <Button htmlType='submit'>提交</Button>
              <Button>取消</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}