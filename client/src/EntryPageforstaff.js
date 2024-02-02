import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import {
  Spin,
  Divider,
  Typography,
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
} from "antd";
import moment from "moment";
import axios from "axios";
import Entryforstaff from "./components/entryforstaff";
import PostEntry from "./PostEntry";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useSessionStorage } from "./SessionStorage/useSessionStorage";
import * as xlsx from "xlsx";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
const URL_TXACTIONS = "api/events/:id/entries?filters[id][$eq]";
const URL_ENTRY = "api/entries";
const URL_POSTENTRY = "api/users?populate=role&filters[role][name]=Student";

const EntryPageforstaff = () => {
  const [excelData, setExcelData] = useState(null);
  const [stdid, setStdid] = useState([]);
  const [postSuccess, setPostSuccess] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get("itemId");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [editFormData, setEditFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef();
  const { handleLogout } = useSessionStorage();
  const { getItem } = useSessionStorage();

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const jwtToken = getItem("jwt");
      console.log("MAaasada11111mma", jwtToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      const response = await axios.get(`${URL_TXACTIONS}=${itemId}`);

      setTransactionData(
        response.data.data.flatMap((d) => {
          return d.attributes.entries.data.map((entry) => ({
            id: entry.id,
            username: entry.attributes.owner.data.attributes.username,
            result: entry.attributes.result,

            seen_datetime: entry.attributes.seen_datetime,
            ack_datetime: entry.attributes.ack_datetime,
            ConfirmView: entry.attributes.ConfirmView
              ? "รับทราบแล้ว"
              : "ยังไม่รับทราบ",
          }));
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (itemId) => {
    console.log("อะไรออกมาบ้าง", itemId);
    try {
      setIsLoading(true);
      const params = { ...itemId };
      const response = await axios.post(URL_ENTRY, { data: params });
      const { id, attributes } = response.data.data;
      setTransactionData([
        ...transactionData,
        { id: id, key: id, ...attributes },
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      fetchItems();
      refreshData();
    }
  };

  const editItem = (itemId) => {
    const currentItem = transactionData.find((item) => item.id === itemId);
    setEditFormData(currentItem);
    setIsEditing(true);

    Modal.confirm({
      title: "Edit Subject",
      okText: "Save",
      okType: "primary",
      htmlType: "submit",
      content: (
        <Form
          initialValues={currentItem}
          onFinish={(values) => handleEdit(values, itemId)}
        >
          <Form.Item
            label="Student Name"
            name="username"
            rules={[
              { required: true, message: "Please enter a subject name!" },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Result"
            name="result"
            rules={[{ required: true, message: "Please enter a Date-Time!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      ),
      okButtonProps: {
        style: { display: "none" },
      },
      onCancel: () => {
        setEditFormData({});
        setIsEditing(false);
      },
    });
  };

  const handleEdit = async (values, itemId) => {
    try {
      setIsLoading(true);

      const payload = {
        data: {
          ...values,
          id: itemId,
        },
      };

      await axios.put(`${URL_ENTRY}/${itemId}`, payload);
      fetchItems();
    } catch (err) {
      console.error("Edit Error:", err);
    } finally {
      setIsLoading(false);
      setEditFormData({});
      setIsEditing(false);
    }
  };

  const deleteItem = (itemId) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this subject?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        try {
          setIsLoading(true);
          await axios.delete(`${URL_ENTRY}/${itemId}`);
          fetchItems();
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      },
      onCancel: () => {},
    });
  };

  const refreshData = () => {
    const jwtToken = getItem("jwt");
    console.log("MAamma", jwtToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(json);
        setExcelData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const PostExcel = async () => {
    try {
      const jwtToken = getItem("jwt");
      console.log("88888888888mma", jwtToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      const CheckUser = await axios.get(URL_POSTENTRY);
      const filterUser = CheckUser.data.filter((item) =>
        item.username.match(/^.*/)
      );
      const filterid = filterUser.map((item) => ({
        id: item.id,
        username: item.username,
      }));
      setStdid(filterid);
      console.log(filterUser)
      for (const excelRow of excelData) {
        const studentId = excelRow[0];
        const matchUser = filterUser.find(
          (item) => item.username === studentId
        );
        console.log(matchUser)
        if (matchUser) {
          const userId = matchUser.id;
          const response = await axios.post(URL_ENTRY, {
            data: {
              result: `${excelRow[1]}`,
              owner: parseInt(userId),
              event: parseInt(itemId),
            },
          });

          console.log("Post Excel to Strapi success:", response.data);
          setPostSuccess(true);
          
        }
      }
      fetchItems();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    refreshData();
    fetchItems();
  }, []);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Staff Page</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Item>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <header className="App-header">
          <Typography.Title></Typography.Title>

          <Divider>
            <h4>Subject entry</h4>
          </Divider>
          <PostEntry onItemcreate={addItem} />
          <div style={{ marginTop: "10px" }}></div>
          <div>
      <form>
        <label htmlFor="upload">Upload File</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </form>
      
        <Button
          variant="success"
          onClick={PostExcel}
          type="primary" 
        >
          Upload
        </Button>
      
    </div>

          <div style={{ marginTop: "20px" }}></div>
          <Entryforstaff
            data={transactionData}
            onTransactionDeleted={deleteItem}
            onTransactionEdit={editItem}
          />
      </header>
    </div>
  );
};

export default EntryPageforstaff;
