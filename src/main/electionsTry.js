import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Space, Tooltip } from 'antd';
import pieChart from './pieChart'

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
        {
            title: 'Election Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a onClick={pieChart}>{text}</a>,
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: {
                showTitle: false,
              },
            render: description => (
                <Tooltip placement="topLeft" title={description}>
                  {description}
                </Tooltip>
              ),
          },
          {
            title: 'Votes Cast',
            dataIndex: 'votes',
            key: 'votes',
          },
          {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
          },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Space size="middle">
                <a>End</a> 
                
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                <a>Delete</a>
                </Popconfirm>
            </Space>  
          ) : null,
          
      },
    ];
    this.state = {
      dataSource: [
        {
            key: '1',
            name: 'Best restaurant',
            description: 'This is an election about the best restaurants in Toronto',
            votes: 23,
            state: 'In progress',
          },
          {
            key: '2',
            name: 'Best bookstore',
            description: 'This is an election about the best bookstores in Toronto',
            votes: 14,
            state: 'In progress',
          },
          {
            key: '3',
            name: 'Best supermarket',
            description: 'This is an election about the best supermarkets in Toronto',
            votes: 123,
            state: 'Ended',
          },
      ],
      count: 3,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        {/* <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button> */}
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          onRowClick={(record) => ({
                onClick: () => { pieChart(record.key); }
            })}
          getTrProps={(state, rowInfo) => ({
          onClick: e => console.log('A row was clicked!')
        })}
        />
      </div>
    );
  }
}

export default EditableTable
// ReactDOM.render(<EditableTable />, mountNode);