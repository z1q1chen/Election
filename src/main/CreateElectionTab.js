import React, { Component } from 'react';

import Elections from '../abis/Elections.json'
import { Form, Input, Button, Space, Layout, Typography, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';

import Web3 from 'web3'

const { Title } = Typography;

const { Content } = Layout;

const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};


class CreateElectionTab extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      elections_contract: null,
    }

    this.loadWeb3()
    this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  loadBlockchainData = async () => {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Elections.networks[networkId]
    if(networkData) {
      const elections_contract = new web3.eth.Contract(Elections.abi, networkData.address)
      this.setState({ elections_contract })
      }
      
  }

  createElection = async election => {
    const title = election.election_title
    const description = election.election_description
    //convert moment to string
    const end_time = election.election_time.format("dddd, MMMM Do YYYY, h:mm:ss a")

    const candidates = election.candidates
    //convert array of candidate names(str) to array of bytes32
    const candidates_byte = candidates.map(candidate => Web3.utils.asciiToHex(candidate.name))
    console.log(candidates_byte)
    
    //create election
    const receipt = await this.state.elections_contract.methods.create_election(title, description, end_time, candidates_byte)
                        .send({ from: this.state.account })

  }

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFinish = values => {
    console.log('Received values of form:', values);
    if (!values.candidates){
      message.error('An election requires at least one candidate!');
    } else if (values.candidates.length >= 32){
      message.error('An election requires at most 31 candidate!');
    } else {
      this.createElection(values);
    }
    this.onReset();
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

            <Form.Item name="election_time" label="Election end time" {...config}>
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
  
            <Form.List name="candidates" style={{ paddingBottom: '30px' }}>
                      
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, 'name']}
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



export default CreateElectionTab;