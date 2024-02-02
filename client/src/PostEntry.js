import { Button, Form, Input } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';
import  axios from 'axios';
import { useSessionStorage } from "./SessionStorage/useSessionStorage";


axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_TXACTIONS = "api/events/:id/entries?filters[id][$eq]";
const URL_ENTRY = "api/entries";
const URL_POSTENTRY = "api/users?populate=role&filters[role][name]=Student";

export default function PostEntry(props) {
  const [form] = Form.useForm();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('itemId');
  const { getItem } = useSessionStorage();

  

  
  const initialValues = {
    owner: '', 
    result: '', 
    event: itemId, 
  };

  const onFinish = async (data) => {
    
    const jwtToken = getItem("jwt");
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    const CheckUser = await axios.get(URL_POSTENTRY);
    const matchingUser = CheckUser.data.find(item => item.username === data.owner);

    
    if (matchingUser) {
      const updatedData = {
        ...data,
        owner: matchingUser.id, 
      };

     
      props.onItemcreate(updatedData);
      form.resetFields();
    } else {
      console.log("User not found");
      
    }
  };


  return (
    <Form
      form={form}
      layout="inline"
      onFinish={onFinish}
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