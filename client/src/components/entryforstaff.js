import { Space, Table, Tag, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from 'moment';
import { useState, useEffect } from 'react';


export default function TransactionList(props) {
  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'username',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 1,
      },
    },
 
    {
     
      title: 'ID',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 2,
      },
    },

    {
      title: 'SeenDate-Time',
      dataIndex: 'seen_datetime',
    },
    {
        title: 'AckDate-Time',
        dataIndex: 'ack_datetime',
    },
    {
        title: 'Result',
        dataIndex: 'result',
        sorter: {
            compare: (a, b) => a.id - b.id,
            multiple: 2,
          },
    },
    {
        title: 'Confirm',
        dataIndex: 'ConfirmView',
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };


  return (
    <Table columns={columns} dataSource={props.data} onChange={onChange} />
  )
} 
