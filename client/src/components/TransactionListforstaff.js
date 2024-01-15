import { Space, Table, Tag, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
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
          <EditOutlined onClick={() => props.onTransactionEdit(record.id)} /> 
          <DeleteOutlined onClick={() => props.onTransactionDeleted(record.id)}  style={{ color: "red", marginLeft: 10 }} />
        </Space>
      ),
    },
  ];




  return (
    <Table columns={columns} dataSource={props.data} />
  )
} 