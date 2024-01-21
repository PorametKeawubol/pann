import { Button, Form, Input,DatePicker } from 'antd';
import React, { useState ,useRef,useEffect} from 'react';

export default function AddItem(props) {
  const [form] = Form.useForm()
  const ref = useRef();

  useEffect(() => {
    console.log(ref.current);
    ref.current.focus();
  }, []);
  
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
        name="seen_datetime"
        label="SeenDatetime"
        rules={[{ required: true }]}>
       
       
        <DatePicker
          ref={ref}
          format="DD/MM/YYYY hh:mm A"
          onChange={(date, dateString) => console.log(date, dateString)}
          showTime={{ use12Hours: true }}
        />
   
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">Add</Button>
      </Form.Item>
    </Form>
  )
}
