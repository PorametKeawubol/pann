import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { EditOutlined, DeleteOutlined, ArrowsAltOutlined } from "@ant-design/icons";
import moment from 'moment';
import './TransactionListforstaff';
import { useState, useEffect } from 'react';


export default function TransactionList(props) {
  const renderDate = (text) => moment(text).isValid() ? moment(text).format('YYYY-MM-DD HH:mm:ss') : text;

  return (
    <Row xs={1} md={2} lg={4} className="row-g4">
      {props.data.map(record => (
        <Col key={record.id} className="mb-4">
          <Card className="custom-card">
            <Card.Body>
              <Card.Title>{record.name}</Card.Title>
              <Card.Text>ID: {record.id}</Card.Text>
              <Card.Text>Date-Time: {renderDate(record.publishedAt)}</Card.Text>
              <div className="button-group">
                <Button variant="primary" onClick={() => props.onTransactionEdit(record.id)}>
                  <EditOutlined /> Edit
                </Button>
                <Button variant="danger" onClick={() => props.onTransactionDeleted(record.id)}>
                  <DeleteOutlined /> Delete
                </Button>
                <Button variant="secondary" onClick={() => props.onTransactionEntry(record.id)}>
                  <ArrowsAltOutlined /> Entry
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}