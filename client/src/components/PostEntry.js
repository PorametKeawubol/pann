import { Button, Form, Input } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PostEntry(props) {
  const [form] = Form.useForm();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('itemId');

  
  const initialValues = {
    owner: '', 
    result: '', 
    event: itemId, 
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={(data) => {
        props.onItemcreate(data);
        form.resetFields();
      }}
      initialValues={initialValues} 
    >
      <Form.Item name="owner" label="Student Name" rules={[{ required: true }]}>
        <Input type="text" placeholder="Input Student Name" />
      </Form.Item>
      <Form.Item name="result" label="Result" rules={[{ required: true }]}>
        <Input type="text" placeholder="Input Result" />
      </Form.Item>
      <Form.Item name="event" label="Event" rules={[{ required: true }]}>
        <Input type="number"  disabled defaultValue={itemId} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}