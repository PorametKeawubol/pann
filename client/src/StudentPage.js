
import './App.css';
import TransactionList from './components/TransactionList';
import { useState, useEffect } from 'react';
import { Spin, Divider, Typography } from 'antd';
import axios from 'axios'
import { Form, Button,FloatingLabel,Stack,style,Container,Card} from 'react-bootstrap';

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
        name: d.attributes.name,
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
          <Divider><h4>คะแนนของนักศึกษา</h4></Divider>
          <TransactionList
            data={transactionData} />
        </Spin>

    </header>
    </div>
  );
}


export default StudentPage;