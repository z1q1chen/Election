import React, { Component } from 'react';

import { Form, Input, Button, Space, Layout, Menu, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';

const { Title } = Typography;

const { RangePicker } = DatePicker;

const { Header, Content } = Layout;

const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }],
};

class Admin extends Component {
  formRef = React.createRef();

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFinish = values => {
    console.log('Received values of form:', values);
    this.onReset();
    // this.state.dvideo.methods.postComment(this.state.currentVideo.id, this.state.value)
    //   .send({ from: this.state.account }).on('transactionHash', (hash) => {
    //     // reset comment state
    //     this.resetState()
    //     // reset video state
    //     this.props.resetState()
    //     this.props.loadBlockchainData()
    // })
  };

  render() {
    return (
      <Layout>
          <Title>Create an election:</Title>
          &nbsp;
          &nbsp;
          <Content style={{ padding: '0 24px' }}>
          
          <Form name="create_election" onFinish={this.onFinish} autoComplete="off" ref={this.formRef}>
  
            <Form.Item name="election_title" label="Election title" rules={[{ required: true, message: 'Missing area' }]}
              style={{ paddingBottom: '30px' }}>
              <Input placeholder="Title" />
            </Form.Item>
  
            <Form.Item name="election_description" label="Election description" rules={[{ required: true, message: 'Missing area' }]}
            style={{ paddingBottom: '30px' }}>
              <Input.TextArea />
            </Form.Item>
  
            <Form.Item name="election_time" label="Election time" {...rangeConfig}
            style={{ paddingBottom: '30px' }}>
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
  
            <Form.List name="candidates" style={{ paddingBottom: '30px' }}>
                      
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, 'candidate']}
                        label="Candidate"
                        fieldKey={[field.fieldKey, 'candidate']}
                        rules={[{ required: true, message: 'Missing candidate' }]}
                      >
                        <Input placeholder="candidate" />
                      </Form.Item>
  
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add candidate
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          </Content>
      </Layout>
    );

  }
  
};



export default Admin;