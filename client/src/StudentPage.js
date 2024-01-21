import React, { useState, useEffect } from 'react';
import { Spin, Divider, Modal } from 'antd';
import axios from 'axios';
import TransactionList from './components/TransactionList';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Logout from './components/logout';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"
const URL_TXACTIONS = '/api/events/studentRelated'
const URL_TXACTIONS1 = '/api/entries'
const URL_TXACTIONS2 = '/api/entries'

function StudentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [ShowFormData, setShowFormData] = useState({});
  const [isShow, setIsShow] = useState(false);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL_TXACTIONS);
      setTransactionData(response.data.data.map(d => ({
        id: d.attributes.entry.id,
        key: d.id,
        name: d.attributes.name,
        publishedAt: d.attributes.entry.publishedAt,
        result: d.attributes.entry.result
      })));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };



  const handleTransactionShow = async (itemId) => {
    const viewItem = transactionData.find((item) => item.id === itemId);
    setShowFormData(viewItem);
    setIsShow(true);
    Modal.confirm({
      title: "Are you sure you want to know the score?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        try {
          setIsLoading(true);
          const confirmview = {
            data: {
              ConfirmView: true,
              ack_datetime: new Date(),
              id: itemId,
            },
          };
          await axios.put(`${URL_TXACTIONS1}/${itemId}/confirm`, confirmview);
          fetchItems();
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      },
      onCancel: () => { },
    });
  };

  const onEyeInvisibleClick = async (itemId) => {
    const view = {
      data: {
        seen_datetime: new Date(),
        id: itemId
      },
    };
    try {
      await axios.put(`${URL_TXACTIONS2}/${itemId}/seenview`, view);

    } catch (error) {
      console.error("Error updating record:", error);
    }


  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
  
    <div className="App" >
       
       <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Student Page</Navbar.Brand>
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
          <Divider><h4>Student Scores</h4></Divider>
          <TransactionList
            data={transactionData}
            onTransactionShow={handleTransactionShow}
            onEyeInvisibleClick={onEyeInvisibleClick}
          />

        </Spin>

      </header>
      

    </div>
  );
}

export default StudentPage;