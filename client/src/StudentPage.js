import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import TransactionList from './components/TransactionList';
import { useState, useEffect } from 'react';
import { Spin, Divider, Typography } from 'antd';
import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"
const URL_TXACTIONS = '/api/events/studentRelated'







function StudentPage() {
  
  const [isLoading, setIsLoading] = useState(false)
  const [transactionData, setTransactionData] = useState([])



  const fetchItems = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(URL_TXACTIONS)
      setTransactionData(response.data.data.map(d => ({
        id: d.id,
        key: d.id,
        result: d.attributes.entry.result,
        publishedAt:d.attributes.entry.publishedAt,
      })))
    } catch (err) {
      console.log(err)
    } finally { setIsLoading(false) }
  }


  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Spin spinning={isLoading}>
          <Typography.Title>
          </Typography.Title>
          <Divider>คะแนนของนักศึกษา</Divider>
          <TransactionList
            data={transactionData} />
        </Spin>
      </header>
    </div>
  );
}


export default StudentPage;
