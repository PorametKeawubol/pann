import { Space, Table, Tag, Button } from 'antd';
import React from 'react';
import { EyeInvisibleFilled} from "@ant-design/icons";


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
    },
    
    {
      title: 'Result',
      dataIndex: 'result',
      render: (_, record) => (
        <Space size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            type="link"
            icon={<EyeInvisibleFilled style={{ color: '#808080' }} />}
            onClick={() => props.onTransactionShow(record.id)}
            style={{ fontSize: '16px' }} 
          />
        </Space> )
    },
    

  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Table columns={columns} dataSource={props.data} onChange={onChange} />
  )
}
