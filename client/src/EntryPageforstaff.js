import './App.css';
import React, { useState, useEffect,useRef } from 'react';
import { Spin, Divider, Typography, Modal, Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import Entryforstaff from './components/entryforstaff';
import PostEntry from './components/PostEntry';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useSessionStorage } from './SessionStorage/useSessionStorage';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_TXACTIONS = 'api/events/:id/entries?filters[id][$eq]';
const URL_Post = 'api/entries';


const EntryPageforstaff = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('itemId');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [editFormData, setEditFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef();
  const { handleLogout } = useSessionStorage();
  const { getItem } = useSessionStorage();

 

  const fetchItems = async (token) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${URL_TXACTIONS}=${itemId}`,
    {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setTransactionData(response.data.data.flatMap(d => {
        return d.attributes.entries.data.map(entry => ({
          id: entry.id,
          username: entry.attributes.owner.data.attributes.username,
          result: entry.attributes.result,
          
          seen_datetime: entry.attributes.seen_datetime,
          ack_datetime: entry.attributes.ack_datetime,
          ConfirmView: entry.attributes.ConfirmView ? 'รับทราบแล้ว' : 'ยังไม่รับทราบ',
        }));
      }));
    
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const addItem = async (item) => {
    try {
      setIsLoading(true);
      const params = { ...item, action_datetime: moment() };
      const response = await axios.post(URL_Post, { data: params },);
      
      const { id, attributes } = response.data.data;
      setTransactionData([
        ...transactionData,
        { id: id, key: id, ...attributes },
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      fetchItems(true);
    }
  };


  const editItem = (itemId) => {
    const currentItem = transactionData.find((item) => item.id === itemId);
    setEditFormData(currentItem);
    setIsEditing(true);

    Modal.confirm({
      title: "Edit Subject",
      okText: "Save",
      okType: "primary",
      htmlType: "submit",
      content: (
        <Form
        initialValues={currentItem}
        onFinish={(values) => handleEdit(values, itemId)}
      >
        <Form.Item label="Student Name" name="username" rules={[{ required: true, message: 'Please enter a subject name!' }]}>
          <Input />
        </Form.Item>
        
        <Form.Item label="Result" name="result" rules={[{ required: true, message: 'Please enter a Date-Time!' }]}>
          <Input />
        </Form.Item>
       
       
        <Form.Item >
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
      ),
      okButtonProps: {
        style: { display: 'none' },
      },
      onCancel: () => {
        setEditFormData({});
        setIsEditing(false);
      
      },
    });
  };

  const handleEdit = async (values, itemId) => {
    try {
      setIsLoading(true);
  
      const payload = {
        data: {
          ...values,
          id: itemId,
        },
      };
  
      await axios.put(`${URL_TXACTIONS}/${itemId}`, payload);
      fetchItems();
    } catch (err) {
      console.error("Edit Error:", err);
    } finally {
      setIsLoading(false);
      setEditFormData({});
      setIsEditing(false);
    }
  };

  const deleteItem = (itemId) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this subject?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        try {
          setIsLoading(true);
          await axios.delete(`${URL_TXACTIONS}/${itemId}`);
          fetchItems();
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      },
      onCancel: () => {},
    });
  };

  const refreshData = () => {
    const jwtToken = getItem('jwt');
    if (jwtToken) {
      fetchItems(jwtToken);
    }
  };

  useEffect(() => {
    refreshData();
    fetchItems();
  }, [getItem]);

  return (
    <div className="App">
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Staff Page</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Item>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <header className="App-header">
        <Spin spinning={isLoading}>
          <Typography.Title></Typography.Title>
          <PostEntry onItemcreate={addItem} />
          <Divider>
            <h4>Subject entry</h4>
          </Divider>
          <Entryforstaff
            data={transactionData}
            onTransactionDeleted={deleteItem}
            onTransactionEdit={editItem}
          />
        </Spin>
      </header>
    </div>
  );
};

export default EntryPageforstaff;
