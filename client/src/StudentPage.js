
import './App.css';
import TransactionList from './components/TransactionList';
import { useState, useEffect } from 'react';
import { Spin, Divider, Modal, Button, Tag } from 'antd';
import axios from 'axios'



axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"
const URL_TXACTIONS = '/api/events/studentRelated'
const URL_TXACTIONS1 = '/api/entries'







function StudentPage() {

  const [isLoading, setIsLoading] = useState(false)
  const [transactionData, setTransactionData] = useState([])
  const [ShowFormData, setShowFormData] = useState({});
  const [isShow, setIsShow] = useState(false);
  const [showScoreColumn, setShowScoreColumn] = useState(false);






  const fetchItems = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(URL_TXACTIONS)
      setTransactionData(response.data.data.map(d => ({
        id: d.attributes.entry.id,
        key: d.id,
        name: d.attributes.name,
        publishedAt: d.attributes.entry.publishedAt,
        result: d.attributes.entry.result

      })))
    } catch (err) {
      console.log(err)
    } finally { setIsLoading(false) }
  }


  const ShowScore = (itemId) => {
    const ViewItem = transactionData.find((item) => item.id === itemId);
    setShowFormData(ViewItem);
    setIsShow(true);

    Modal.confirm({
      title: "Are you sure, you want to delete this subject?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        try {

          setIsLoading(true);


          const confirmview = {
            data: {
              "ConfirmView": "true",
              id: itemId,
            },
          };
          await axios.put(`${URL_TXACTIONS1}/${itemId}/confirm`, confirmview);
          setShowScoreColumn(true);
       


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
            onTransactionShow={ShowScore}
         />

        </Spin>

      </header>
    </div>
  );
}


export default StudentPage; 