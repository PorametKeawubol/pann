import { Button, Form, Input,DatePicker } from 'antd';
import React, { useState ,useRef,useEffect} from 'react';

export default function AddItem(props) {
  const [form] = Form.useForm()
  
  
  return (
    <Form form={form} layout="inline" onFinish={(data) => {
      props.onItemAdded(data);
      form.resetFields();
    }}>
      <Form.Item
        name="username"
        label="Studemt Name"
        rules={[{ required: true }]}
      ><Input placeholder="Input Subject Name" />
      </Form.Item>
      <Form.Item
        name="result"
        label="Result"
        rules={[{ required: true }]}
      ><Input placeholder="Input Result" />
      </Form.Item>
      
      
      <Form.Item>
        <Button type="primary" htmlType="submit">Add</Button>
      </Form.Item>
    </Form>
  )
}
