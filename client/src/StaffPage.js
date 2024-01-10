import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import TransactionListforstaff from './components/TransactionListforstaff';
import { useState, useEffect } from 'react';
import { Spin, Divider, Typography } from 'antd';
import axios from 'axios'

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
        publishedAt:d.attributes.publishedAt,
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
          <Divider><h4>วิชาของอาจาร์ย</h4></Divider>
          <TransactionListforstaff
            data={transactionData} />
        </Spin>
      </header>
    </div>
  );
}


export default StaffPage;