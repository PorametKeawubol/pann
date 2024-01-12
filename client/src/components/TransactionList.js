import { Space, Table, Tag, Button } from 'antd';
import moment from 'moment';


export default function TransactionList(props) {
  const columns = [
    {
      title: 'Subject',
      dataIndex: 'name',
    },
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    
    {
      title: 'Date-Time',
      dataIndex: 'publishedAt',
    },
    
    {
      title: 'Result',
      dataIndex: 'result',
    },

  ];

  return (
    <Table columns={columns} dataSource={props.data} />
  )
}
