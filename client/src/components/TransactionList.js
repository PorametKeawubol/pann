import { Space, Table, Tag, Button } from 'antd';
import React from 'react';
import { EyeInvisibleFilled } from "@ant-design/icons";
import { useState, useEffect } from 'react';



export default function TransactionList(props) {
  const [showScoreColumn, setShowScoreColumn] = useState(false);
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
        </Space>)
    },
    {
      title: 'Score',
      dataIndex: 'result',
      //render: (_, record) => (
        //<div style={{ display: showScoreColumn ? 'block' : 'none' }}>
          //{record.result}
        //</div>
        //),
    },
    {
      title: 'Status',
      dataIndex: 'result',
      render: (result) => {
        let status;
        let color;
  
        if (result < 50) {
          status = 'Negative';
          color = '#FF0000';
        } else if (result >= 50 && result < 80) {
          status = 'Neutral';
          color = '#FFA500';
        } else {
          status = 'Positive';
          color = "#87d068";
        }
  
        return (
          //<div style={{ display: showScoreColumn ? 'block' : 'none' }}>
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          //</div>
        );
      },
    },



  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Table columns={columns} dataSource={props.data} onChange={onChange} />
  )
} 