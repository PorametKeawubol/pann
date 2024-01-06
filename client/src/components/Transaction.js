import { Space, Table, Tag, Button } from 'antd';
import moment from 'moment';


export default function TransactionList(props) {
  const columns = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'id',
      title: 'Date-Time',
      dataIndex: 'publishedAt',
    },
    
    {
      key: 'id',
      title: 'Result',
      dataIndex: 'result',
    },

  ];

  return (
    <Table columns={columns} dataSource={props.data} />
  )
}