import { Space, Table, Tag, Button } from 'antd';
import React, { useState } from 'react';
import { EyeInvisibleFilled, EyeFilled } from "@ant-design/icons";
import axios from 'axios';

const URL_TXACTIONS2 = '/api/entries';

export default function TransactionList(props) {
  const [clickedRows, setClickedRows] = useState([]);

  const onEyeIconClick = async (itemId) => {
    const view = {
      data: {
        seen_datetime: new Date(),
        id: itemId
      },
    };
    try {
      await axios.put(`${URL_TXACTIONS2}/${itemId}/seenview`, view);
    } catch (error) {
      console.error("Error updating record:", error);
    }

    if (clickedRows.includes(itemId)) {
      setClickedRows((prevClickedRows) => prevClickedRows.filter((id) => id !== itemId));
      
    } else {
      setClickedRows((prevClickedRows) => [...prevClickedRows, itemId]);
      props.onTransactionShow(itemId);
    }

    props.onEyeInvisibleClick(itemId);
    
  };

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
            icon={clickedRows.includes(record.id) ? <EyeFilled style={{ color: '#808080' }} /> : <EyeInvisibleFilled style={{ color: '#808080' }} />}
            onClick={() => onEyeIconClick(record.id)}
          />
        </Space>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'result',
      render: (_, record) => (clickedRows.includes(record.id) ? <span>{record.result}</span> : null),
    },
    {
      title: 'Status',
      dataIndex: 'result',
      render: (result, record) => {
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
          clickedRows.includes(record.id) ? (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          ) : null
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Table columns={columns} dataSource={props.data} onChange={onChange} />
  );
}
