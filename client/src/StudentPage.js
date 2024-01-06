import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import TransactionList from './components/TransactionList';
import AddItem from './components/AddItem';
import { useState, useEffect } from 'react';
import { Spin, Divider, Typography } from 'antd';
import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"
const URL_TXACTIONS = '/api/events/studentRelated'







function StudentPage() {
  const [currentAmount, setCurrentAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [transactionData, setTransactionData] = useState([])



  const fetchItems = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(URL_TXACTIONS)
      setTransactionData(response.data.data.map(d => ({
        id: d.id,
        key: d.id,
        ...d.attributes
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

  const deleteItem = async (itemId) => {
    try {
      setIsLoading(true)
      await axios.delete(`${URL_TXACTIONS}/${itemId}`)
      fetchItems()
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <Spin spinning={isLoading}>
          <Typography.Title>
          </Typography.Title>
          <Divider>คะแนนของนักศึกษา</Divider>
          <TransactionList />
        </Spin>
      </header>
    </div>
  );
}


export default StudentPage;
