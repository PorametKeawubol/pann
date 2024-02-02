import React, { useState } from "react";
import { Card, Button, Row } from "react-bootstrap";
import { EyeInvisibleFilled, EyeFilled } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import "./TransactionList.css";

const URL_TXACTIONS2 = "/api/entries";

export default function TransactionList(props) {
  const [clickedRows, setClickedRows] = useState([]);

  const onEyeIconClick = async (itemId) => {
    const view = {
      data: {
        seen_datetime: new Date(),
        id: itemId,
      },
    };
    try {
      await axios.put(`${URL_TXACTIONS2}/${itemId}/seenview`, view);
    } catch (error) {
      console.error("Error updating record:", error);
    }

    if (clickedRows.includes(itemId)) {
      setClickedRows((prevClickedRows) =>
        prevClickedRows.filter((id) => id !== itemId)
      );
    } else {
      setClickedRows((prevClickedRows) => [...prevClickedRows, itemId]);
      props.onTransactionShow(itemId);
    }

    props.onEyeInvisibleClick(itemId);
  };

  return (
    <Row xs={1} md={2} lg={4} className="row-g4">
      {props.data.map((record) => (
        <Card
          key={record.id}
          className={`card ${clickedRows.includes(record.id) ? "active" : ""}`}
        >
          <Card.Body className="card-body">
            <div className="card-details">
              <Card.Title className="card-title">{record.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                ID: {record.id}
              </Card.Subtitle>
              <Card.Text>
                Date-Time:{" "}
                {moment(record.publishedAt).isValid()
                  ? moment(record.publishedAt).format("YYYY-MM-DD HH:mm:ss")
                  : record.publishedAt}
              </Card.Text>
            </div>
            <Button
              variant="link"
              className="card-btn"
              onClick={() => onEyeIconClick(record.id)}
            >
              {clickedRows.includes(record.id) ? (
                <EyeFilled style={{ color: "#808080" }} />
              ) : (
                <EyeInvisibleFilled style={{ color: "#808080" }} />
              )}
            </Button>
          </Card.Body>
          {clickedRows.includes(record.id) && (
            <div
              className={`card-details status-${
                record.result < 50
                  ? "negative"
                  : record.result < 80
                  ? "neutral"
                  : "positive"
              }`}
            >
              <Card.Text>Score : {record.result}</Card.Text>
              <Card.Text>
                Status :
                <span
                  className={`status-${
                    record.result < 50
                      ? "negative"
                      : record.result < 80
                      ? "neutral"
                      : "positive"
                  }`}
                >
                  {record.result < 50
                    ? " Negative"
                    : record.result < 80
                    ? " Neutral"
                    : " Positive"}
                </span>
              </Card.Text>
            </div>
          )}
        </Card>
      ))}
    </Row>
  );
}
