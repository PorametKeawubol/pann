import { Button, Form, Select, Input, InputNumber, Radio, Space, Table,bottomOptions } from 'antd';
import React, { useState } from 'react';

export default function AddItem(props) {
  const [form] = Form.useForm()
  
  return (
    <Form form={form} layout="inline" onFinish={(data) => {
      props.onItemAdded(data);
      form.resetFields();
    }}>
      <Form.Item
        name="name"
        label="Subject Name"
        rules={[{ required: true }]}
      ><Input placeholder="name" />
      </Form.Item>
      <Form.Item
        name="effective_datetime"
        label="Datetime"
        rules={[{ required: true }]}>
        <Input placeholder="effective_datetime" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">Add</Button>
      </Form.Item>
    </Form>
  )
}
