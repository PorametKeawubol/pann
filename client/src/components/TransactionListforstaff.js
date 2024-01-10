import { Space, Table, Tag, Button } from 'antd';
import moment from 'moment';


export default function TransactionListforstaff(props) {
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
    
    

  ];

  return (
    <Table columns={columns} dataSource={props.data} />
  )
}