
import './App.css';
import TransactionList from './components/TransactionList';
import { useState, useEffect } from 'react';
import { Spin, Divider,Modal } from 'antd';
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
        publishedAt:d.attributes.entry.publishedAt
      })))
    } catch (err) {
      console.log(err)
    } finally { setIsLoading(false) }
  }

  const ShowScore = (itemId) => {   //ยังทำไม่เสร็จจจจจจจจจจจจจจจจจจจ
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


  useEffect(() => {
    fetchItems()
  }, [])


  return (
    <div className="App">
      <header className="App-header">
      
      <Spin spinning={isLoading}>
          <Divider><h4>Student Scores</h4></Divider>
          <TransactionList
            data={transactionData} 
            onTransactionShow={ShowScore}/>
        </Spin>

    </header>
    </div>
  );
}


export default StudentPage;