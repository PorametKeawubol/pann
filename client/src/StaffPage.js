import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Spin, Divider, Typography, Modal, Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import TransactionListforstaff from './components/TransactionListforstaff';
import AddItem from './components/AddItem';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Logout from './components/logout';
import { Link } from 'react-router-dom';
import EntryPageforstaff from './EntryPageforstaff';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_TXACTIONS = '/api/events';


const StaffPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [editFormData, setEditFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef();
  const navigate = useNavigate()

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL_TXACTIONS);
      setTransactionData(response.data.data.map((d) => ({
        id: d.id,
        key: d.id,
        name: d.attributes.name,
        publishedAt: d.attributes.publishedAt,
      })));
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
      const response = await axios.post(URL_TXACTIONS, { data: params });
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
          <Form.Item label="Subjesct Name" name="name" rules={[{ required: true, message: 'Please enter a subject name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="ID" name="id" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Date-Time" name="publishedAt" rules={[{ required: true, message: 'Please enter a Date-Time!' }]}>

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
      console.log("Edit values:", values);
      console.log("Item ID:", itemId);

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
      onCancel: () => { },
    });
  };
  const showentry = (itemId) => {
    navigate('/staff/entry');
    
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Staff Page</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Item>
                <Nav.Link onClick={Logout}>Logout</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <header className="App-header">
        <Spin spinning={isLoading}>
          <Typography.Title></Typography.Title>
          <AddItem onItemAdded={addItem} />
          <Divider>
            <h4>Subject </h4>
          </Divider>
          <TransactionListforstaff
            data={transactionData}
            onTransactionDeleted={deleteItem}
            onTransactionEdit={editItem}
            onTransactionEntry={showentry}
          />
        </Spin>
      </header>
    </div>
  );
};

export default StaffPage;
