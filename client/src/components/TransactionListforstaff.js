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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => props.onTransactionDeleted(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];




  return (
    <Table columns={columns} dataSource={props.data} />
  )
} 