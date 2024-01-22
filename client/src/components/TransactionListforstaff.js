import { Space, Table, Tag, Button } from 'antd';
import { EditOutlined, DeleteOutlined,ArrowsAltOutlined } from "@ant-design/icons";
import moment from 'moment';
import { useState, useEffect } from 'react';


export default function TransactionList(props) {
  const columns = [
    {
      title: 'Subject',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 1,
      },
    },
 
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 2,
      },
    },

    {
      title: 'Date-Time',
      dataIndex: 'publishedAt',
      render: (text) => moment(text).isValid() ? moment(text).format('YYYY-MM-DD HH:mm:ss') : text,
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size={'middle'}  >
          <EditOutlined onClick={() => props.onTransactionEdit(record.id)}  />
          <DeleteOutlined onClick={() => props.onTransactionDeleted(record.id)} style={{ color: "red", marginLeft: 10 }} />
          <ArrowsAltOutlined onClick={() => props.onTransactionEntry(record.id)} style={{  marginLeft: 10 }}/>
        </Space>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };


  return (
    <Table columns={columns} dataSource={props.data} onChange={onChange} />
  )
} 
