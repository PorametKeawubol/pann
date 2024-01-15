import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import TransactionListforstaff from './components/TransactionListforstaff';
import { useState, useEffect, useRef } from 'react';
import { Spin, Divider, Typography, DatePicker, Modal, Form, Input, Button } from 'antd';
import axios from 'axios'
import AddItem from './components/AddItem';


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"
const URL_TXACTIONS = '/api/events'



function StaffPage() {
  const [isLoading, setIsLoading] = useState(false)

  const [transactionData, setTransactionData] = useState([])



  const fetchItems = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(URL_TXACTIONS)
      setTransactionData(response.data.data.map(d => ({
        id: d.id,
        key: d.id,
        name: d.attributes.name,
        publishedAt: d.attributes.publishedAt,
      })))
    } catch (err) {
      console.log(err)
    } finally { setIsLoading(false) }
  }

  const addItem = async (item) => {
    try {
      setIsLoading(true)
      const params = { ...item, action_datetime: moment() }
      const response = await axios.post(URL_TXACTIONS, { data: params })
      const { id, attributes } = response.data.data
      setTransactionData([
        ...transactionData,
        { id: id, key: id, ...attributes }
      ])
      
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }


  const editItem = (itemId) => {
    Modal.confirm({
      title: "Edit Item",
      content: (
        <Form
          onFinish={async (values) => {
            try {
              setIsLoading(true);
              await axios.put(`${URL_TXACTIONS}/${itemId}`, values);
              fetchItems();

              Modal.destroyAll();
            } catch (err) {
              console.log(err);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <Form.Item label="Subject Name" name="name">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save changes
            </Button>
          </Form.Item>
        </Form>
      ),
      onCancel: () => {
       
      },
      okButtonProps: {
        style: { display: 'none' }, 
      },
    });
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
      onCancel: () => {

      },
    });
  };

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Spin spinning={isLoading}>
          <Typography.Title>
          </Typography.Title>
          <AddItem onItemAdded={addItem} />
          <Divider><h4>Subject </h4></Divider>
          <TransactionListforstaff
            data={transactionData}
            onTransactionDeleted={deleteItem}
            onTransactionEdit={editItem} />
        </Spin>
      </header>
    </div>
  );
}


export default StaffPage;