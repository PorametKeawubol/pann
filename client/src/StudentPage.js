import React, { useState, useEffect } from 'react';
import { Spin, Divider, Modal, } from 'antd';
import axios from 'axios';
import TransactionList from './components/TransactionList';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSessionStorage } from './SessionStorage/useSessionStorage';
import AppSeach from './components/AppSearch';




axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"
const URL_TXACTIONS = '/api/events/studentRelated'
const URL_TXACTIONS1 = '/api/entries'
const URL_TXACTIONS2 = '/api/entries'

function StudentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [ShowFormData, setShowFormData] = useState({});
  const [isShow, setIsShow] = useState(false);
  const { getItem } = useSessionStorage();
  const { handleLogout } = useSessionStorage();
  const [searchText, setSearchText] = useState('');


  const fetchItems = async (token,search) => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL_TXACTIONS, {
        params: {
          filters: {
            name: {
              $eq: search,
            },
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactionData(response.data.data.map((d) => ({
        id: d.attributes.entry.id,
        key: d.id,
        name: d.attributes.name,
        publishedAt: d.attributes.entry.publishedAt,
        result: d.attributes.entry.result,
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
      title: "Are you sure you want to give the teacher the score acknowledgment?",
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

  const refreshData = () => {
    const jwtToken = getItem('jwt');
    if (jwtToken) {
      fetchItems(jwtToken);
    }
  };

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    const jwtToken = getItem('jwt');
    if (jwtToken) {
      fetchItems(jwtToken, searchText);
    }
  };

  const handleBackButtonClick = () => {
    fetchItems();
  };

  
  useEffect(() => {
    refreshData();
  }, [getItem]);

  return (
  
    <div >
       
       <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand style={{ fontWeight: 'bold', color: 'black' }}>Student Page</Navbar.Brand>
          <Nav.Item>
            <Nav.Link onClick={handleBackButtonClick} >
              Show All
            </Nav.Link>
          </Nav.Item>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Item>
                <Nav.Link onClick={handleLogout}> Logout</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <header >
          <Divider><h4>Student Scores</h4></Divider>
          <AppSeach value={searchText} onValueChange={setSearchText} onSearch={handleSearch}/>
          
      </header>
      <Spin spinning={isLoading}>
      <TransactionList
            data={transactionData}
            onTransactionShow={handleTransactionShow}
            onEyeInvisibleClick={onEyeInvisibleClick}
            
          />
</Spin>

    </div>
  );
}
export default StudentPage;
