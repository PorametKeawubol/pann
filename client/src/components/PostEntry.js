import { Button, Form, Input, DatePicker, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState ,useRef,useEffect} from 'react';

export default function PostEntry(props) {
  const [form] = Form.useForm()
  
  
  return (
    <Form form={form} layout="inline" onFinish={(data) => {
      props.onItemcreate(data);
      form.resetFields();
    }}>
      <Form.Item
        name="username"
        label="Student Name"
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
      <Form.Item
        name="file"
        label="File"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e;
          }
          return e && e.fileList;
        }}
      >
        <Upload beforeUpload={() => false} maxCount={1}>
          <Button icon={<UploadOutlined />} type="default">
            Upload File
          </Button>
        </Upload>
      </Form.Item>
    </Form>
  )
}
