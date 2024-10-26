



// import React, { useCallback, useEffect, useState } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { Drawer, Form, Input, DatePicker, Select, Button, Modal, message, Tag } from 'antd';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import mail from "../../assets/images/mail.png";
// import './EntityTable.css';

// const { TextArea } = Input;

// function EntityTable() {
//   const [entities, setEntities] = useState([]);
//   const [gridApi, setGridApi] = useState(null);
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [mailDrawerVisible, setMailDrawerVisible] = useState(false);
//   const [editingEntity, setEditingEntity] = useState(null);
//   const [form] = Form.useForm();
//   const [mailForm] = Form.useForm();
//   const [user, setUser] = useState(null);
//   const [emails, setEmails] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch('http://172.17.2.77:8080/intranetapp/entity-requests/')
//       .then(response => response.json())
//       .then(data => setEntities(data))
//       .catch(error => console.error('Error fetching data:', error));

//     const userData = localStorage.getItem('user');
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         localStorage.removeItem('user');
//         navigate('/login');
//       }
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleEdit = useCallback((params) => {
//     setEditingEntity(params.data);
//     form.setFieldsValue({
//       ...params.data,
//       proposed_date: moment(params.data.proposed_date)
//     });
//     setDrawerVisible(true);
//   }, [form]);

//   const handleDelete = useCallback((params) => {
//     console.log("Delete clicked for entity with ID:", params.data.entcr_id);
//     setEntities(prevEntities => prevEntities.filter(entity => entity.entcr_id !== params.data.entcr_id));
//   }, []);

//   const handleSendMail = useCallback((params) => {
//     setEditingEntity(params.data);
//     mailForm.setFieldsValue({
//       entity_request_id: params.data.entcr_id
//     });
//     setMailDrawerVisible(true);
//   }, [mailForm]);

//   const onDrawerClose = () => {
//     setDrawerVisible(false);
//     setEditingEntity(null);
//     form.resetFields();
//   };

//   const onMailDrawerClose = () => {
//     setMailDrawerVisible(false);
//     mailForm.resetFields();
//     setEmails([]);
//   };

//   const onFinish = (values) => {
//     console.log("Updated entity:", values);
//     setEntities(prevEntities =>
//       prevEntities.map(entity =>
//         entity.entcr_id === editingEntity.entcr_id ? { ...entity, ...values } : entity
//       )
//     );
//     onDrawerClose();
//   };

//   const onMailFinish = (values) => {
//     Modal.confirm({
//       title: 'Are you sure you want to send emails?',
//       onOk() {
//         const payload = {
//           ...values,
//           receiver_emails: emails,
//           user_id: user?.user_id || null
//         };
//         fetch('http://172.17.2.77:8080/intranetapp/send-email/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(payload),
//         })
//         .then(response => response.json())
//         .then(data => {
//           message.success('Email sent successfully');
//           onMailDrawerClose();
//         })
//         .catch(error => {
//           console.error('Error sending email:', error);
//           message.error('Failed to send email');
//         });
//       },
//     });
//   };

//   const handleEmailInputChange = (e) => {
//     const inputValue = e.target.value;
//     if (inputValue.endsWith(',') || inputValue.endsWith(' ')) {
//       const newEmail = inputValue.slice(0, -1).trim();
//       if (isValidEmail(newEmail) && !emails.includes(newEmail)) {
//         setEmails([...emails, newEmail]);
//         e.target.value = '';
//       }
//     }
//   };

//   const isValidEmail = (email) => {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
//   };

//   const removeEmail = (emailToRemove) => {
//     setEmails(emails.filter(email => email !== emailToRemove));
//   };

//   const columnDefs = [
//     { headerName: "Proposed Name", field: "proposed_name", sortable: true, filter: true },
//     { headerName: "Proposed Date", field: "proposed_date", sortable: true, filter: true },
//     { headerName: "Proposed By", field: "proposed_by", sortable: true, filter: true },
//     { headerName: "Proposer Name", field: "proposer_name", sortable: true, filter: true },
//     { headerName: "Entity Nature", field: "entity_nature", sortable: true, filter: true },
//     {
//       headerName: "Send Mail",
//       field: "actions",
//       cellRenderer: (params) => (
//         <button className="clear-button" onClick={() => handleSendMail(params)} title="Send Mail">
//           <img style={{width: "20px"}} src={mail} alt="mail"/>Send Mail
//         </button>
//       )
//     },
//     { 
//       headerName: "Status", 
//       field: "status", 
//       sortable: true, 
//       filter: true,
//       cellRenderer: (params) => (
//         <span className={`status-badge ${params.value.toLowerCase()}`}>
//           {params.value}
//         </span>
//       )
//     },
//     { headerName: "Entity Name", field: "entity_name", sortable: true, filter: true },
//     { headerName: "Department", field: "department_name", sortable: true, filter: true },
//     {
//       headerName: "Actions",
//       field: "actions",
//       cellRenderer: (params) => (
//         <div className="action-buttons">
//           <button className="clear-button" onClick={() => handleEdit(params)} title="Edit">
//             Edit
//           </button>
//           <button className="clear-button" onClick={() => handleDelete(params)} title="Delete">
//             Delete
//           </button>
//         </div>
//       )
//     }
//   ];

//   const onGridReady = (params) => {
//     setGridApi(params.api);
//   };

//   const downloadCSV = () => {
//     gridApi.exportDataAsCsv();
//   };

//   return (
//     <div className="entity-table-container">
//       <div className="table-header-entity">
//         <div>
//           <h2>Entities</h2>
//         </div>
//         <div className="header-buttons">
//           <button className="clear-button" onClick={downloadCSV}>
//             Download CSV
//           </button>
//           <button className="clear-button">
//             Add Entity
//           </button>
//         </div>
//       </div>
//       <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
//         <AgGridReact
//           columnDefs={columnDefs}
//           rowData={entities}
//           onGridReady={onGridReady}
//           pagination={true}
//           paginationPageSize={10}
//         />
//       </div>
//       <Drawer
//         title="Edit Entity"
//         placement="right"
//         onClose={onDrawerClose}
//         visible={drawerVisible}
//         width={400}
//       >
//         <Form form={form} layout="vertical" onFinish={onFinish}>
//           <Form.Item name="proposed_name" label="Proposed Name">
//             <Input />
//           </Form.Item>
//           <Form.Item name="proposed_date" label="Proposed Date">
//             <DatePicker />
//           </Form.Item>
//           <Form.Item name="proposed_by" label="Proposed By">
//             <Input />
//           </Form.Item>
//           <Form.Item name="proposer_name" label="Proposer Name">
//             <Input />
//           </Form.Item>
//           <Form.Item name="entity_nature" label="Entity Nature">
//             <Input />
//           </Form.Item>
//           <Form.Item name="status" label="Status">
//             <Select>
//               <Select.Option value="Active">Active</Select.Option>
//               <Select.Option value="Inactive">Inactive</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="entity_name" label="Entity Name">
//             <Input />
//           </Form.Item>
//           <Form.Item name="department_name" label="Department">
//             <Input />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Update Entity
//             </Button>
//           </Form.Item>
//         </Form>
//       </Drawer>
//       <Drawer
//         title="Send Mail"
//         placement="right"
//         onClose={onMailDrawerClose}
//         visible={mailDrawerVisible}
//         width={600}
//       >
//         <Form form={mailForm} layout="vertical" onFinish={onMailFinish}>
//           <Form.Item label="Receiver Emails" required>
//             <div className="email-input-container">
//               {emails.map((email, index) => (
//                 <Tag key={index} closable onClose={() => removeEmail(email)}>
//                   {email}
//                 </Tag>
//               ))}
//               <Input
//                 placeholder="Enter email addresses"
//                 onChange={handleEmailInputChange}
//                 style={{ 
//                   background: isValidEmail(mailForm.getFieldValue('receiver_emails')) ? '#e6f7e6' : 'white'
//                 }}
//               />
//             </div>
//           </Form.Item>
//           <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="body" label="Body" rules={[{ required: true }]}>
//             <ReactQuill theme="snow" />
//           </Form.Item>
//           <Form.Item name="entity_request_id" label="Entity Request ID" rules={[{ required: true }]}>
//             <Input disabled />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Send Mail
//             </Button>
//           </Form.Item>
//         </Form>
//       </Drawer>
//     </div>
//   );
// }

// export default EntityTable;import React, { useCallback, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Drawer, Form, Input, DatePicker, Select, Button, Modal, message, Tag } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import mail from "../../assets/images/mail.png";
import './EntityTable.css';
import { useCallback, useEffect, useState } from 'react';

const { TextArea } = Input;

function EntityTable() {
  const [entities, setEntities] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [mailDrawerVisible, setMailDrawerVisible] = useState(false);
  const [editingEntity, setEditingEntity] = useState(null);
  const [form] = Form.useForm();
  const [mailForm] = Form.useForm();
  const [user, setUser] = useState(null);
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://172.17.2.77:8080/intranetapp/entity-requests/')
      .then(response => response.json())
      .then(data => setEntities(data))
      .catch(error => console.error('Error fetching data:', error));

    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleEdit = useCallback((params) => {
    setEditingEntity(params.data);
    form.setFieldsValue({
      ...params.data,
      proposed_date: moment(params.data.proposed_date)
    });
    setDrawerVisible(true);
  }, [form]);

  const handleDelete = useCallback((params) => {
    console.log("Delete clicked for entity with ID:", params.data.entcr_id);
    setEntities(prevEntities => prevEntities.filter(entity => entity.entcr_id !== params.data.entcr_id));
  }, []);

  const handleSendMail = useCallback((params) => {
    setEditingEntity(params.data);
    mailForm.setFieldsValue({
      entity_request_id: params.data.entcr_id
    });
    setMailDrawerVisible(true);
  }, [mailForm]);

  const onDrawerClose = () => {
    setDrawerVisible(false);
    setEditingEntity(null);
    form.resetFields();
  };

  const onMailDrawerClose = () => {
    setMailDrawerVisible(false);
    mailForm.resetFields();
    setEmails([]);
  };

  const onFinish = (values) => {
    console.log("Updated entity:", values);
    setEntities(prevEntities =>
      prevEntities.map(entity =>
        entity.entcr_id === editingEntity.entcr_id ? { ...entity, ...values } : entity
      )
    );
    onDrawerClose();
  };

  const onMailFinish = (values) => {
    Modal.confirm({
      title: 'Are you sure you want to send emails?',
      onOk() {
        const payload = {
          ...values,
          receiver_emails: emails,
          user_id: user?.user_id || null
        };
        fetch('http://172.17.2.77:8080/intranetapp/send-email/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
          message.success('Email sent successfully');
          onMailDrawerClose();
        })
        .catch(error => {
          console.error('Error sending email:', error);
          message.error('Failed to send email');
        });
      },
    });
  };

  const handleEmailInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.endsWith(',') || inputValue.endsWith(' ')) {
      const newEmail = inputValue.slice(0, -1).trim();
      if (isValidEmail(newEmail) && !emails.includes(newEmail)) {
        setEmails([...emails, newEmail]);
        e.target.value = '';
      }
    }
  };

  const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const removeEmail = (emailToRemove) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const columnDefs = [
    { headerName: "Proposed Name", field: "proposed_name", sortable: true, filter: true },
    { headerName: "Proposed Date", field: "proposed_date", sortable: true, filter: true },
    { headerName: "Proposed By", field: "proposed_by", sortable: true, filter: true },
    { headerName: "Proposer Name", field: "proposer_name", sortable: true, filter: true },
    { headerName: "Entity Nature", field: "entity_nature", sortable: true, filter: true },
    {
      headerName: "Send Mail",
      field: "actions",
      cellRenderer: (params) => (
        <button className="clear-button" onClick={() => handleSendMail(params)} title="Send Mail">
          <img style={{width: "20px"}} src={mail} alt="mail"/>Send Mail
        </button>
      )
    },
    { 
      headerName: "Status", 
      field: "status", 
      sortable: true, 
      filter: true,
      cellRenderer: (params) => (
        <span className={`status-badge ${params.value.toLowerCase()}`}>
          {params.value}
        </span>
      )
    },
    { headerName: "Entity Name", field: "entity_name", sortable: true, filter: true },
    { headerName: "Department", field: "department_name", sortable: true, filter: true },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="action-buttons">
          <button className="clear-button" onClick={() => handleEdit(params)} title="Edit">
            Edit
          </button>
          <button className="clear-button" onClick={() => handleDelete(params)} title="Delete">
            Delete
          </button>
        </div>
      )
    }
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const downloadCSV = () => {
    gridApi.exportDataAsCsv();
  };

  return (
    <div className="entity-table-container">
      <div className="table-header-entity">
        <div>
          <h2>Entities</h2>
        </div>
        <div className="header-buttons">
          <button className="clear-button" onClick={downloadCSV}>
            Download CSV
          </button>
          <button className="clear-button">
            Add Entity
          </button>
        </div>
      </div>
      <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={entities}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
      <Drawer
        title="Edit Entity"
        placement="right"
        onClose={onDrawerClose}
        visible={drawerVisible}
        width={400}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="proposed_name" label="Proposed Name">
            <Input />
          </Form.Item>
          <Form.Item name="proposed_date" label="Proposed Date">
            <DatePicker />
          </Form.Item>
          <Form.Item name="proposed_by" label="Proposed By">
            <Input />
          </Form.Item>
          <Form.Item name="proposer_name" label="Proposer Name">
            <Input />
          </Form.Item>
          <Form.Item name="entity_nature" label="Entity Nature">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="entity_name" label="Entity Name">
            <Input />
          </Form.Item>
          <Form.Item name="department_name" label="Department">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Entity
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        title="Send Mail"
        placement="right"
        onClose={onMailDrawerClose}
        visible={mailDrawerVisible}
        width={600}
      >
        <Form form={mailForm} layout="vertical" onFinish={onMailFinish}>
          <Form.Item label="Receiver Emails" required>
            <div className="email-input-container">
              {emails.map((email, index) => (
                <Tag key={index} closable onClose={() => removeEmail(email)}>
                  {email}
                </Tag>
              ))}
              <Input
                placeholder="Enter email addresses"
                onChange={handleEmailInputChange}
                style={{ 
                  background: isValidEmail(mailForm.getFieldValue('receiver_emails')) ? '#e6f7e6' : 'white'
                }}
              />
            </div>
          </Form.Item>
          <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="body" label="Body" rules={[{ required: true }]}>
            <ReactQuill theme="snow" />
          </Form.Item>
          <Form.Item name="entity_request_id" label="Entity Request ID" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send Mail
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default EntityTable;