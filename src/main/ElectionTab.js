import { Table, Space, Button, Tabs } from "antd";
import React from "react";
import Election from "./Election.js";
import Elections from '../abis/Elections.json'
import Web3 from 'web3'
import payload from './payload.json'
import { Components } from "antd/lib/date-picker/generatePicker";

const { Column } = Table;

const { TabPane } = Tabs;


class ElectionTab extends React.Component {
  newTabIndex = 0;


  constructor(props)  {
    super(props)
    this.state={
      activeKey:null,
      panes: null,
      account: '',
      elections_data: [],
      elections_contract: []
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

  updatePanes() {
    console.log(this.state.elections_data)
    this.initialPanes = [
      {
        title: "Home",
        content: (
          <Table dataSource={this.state.elections_data}>
            <Column title="Title" dataIndex="title" key="title" />
            <Column
              title="Description"
              dataIndex="description"
              key="description"
            />
            <Column title="End Time" dataIndex="endtime" key="endtime" />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <Button type="primary" ghost onClick={() => this.add(record)}>
                    Participate
                  </Button>
                </Space>
              )}
            />
          </Table>
        ),
        key: "1",
        closable: false,
      },
    ];
    this.setState({activeKey: this.initialPanes[0].key, panes: this.initialPanes}, () => {
      console.log(this.state)
    })
    
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
      this.setState({ elections_contract: elections_contract }, () => {
        this.loadJson();
      })
    }
    
  }

  loadJson = async () => {
    // const token = await this.elections_contract.methods.getElection().send({from: this.account});
    // var token = await this.elections_contract.methods.election_count.call().call();
    // var token = await this.elections_contract.methods.elections[0].call().call();
    var token = await this.state.elections_contract.methods.getElection().call();
    console.log(String(token[0]))
    console.log(String(token[1]))
    console.log(String(token[2]))
    // var token2 = await this.elections_contract.methods.getCandidate().call();

    let oneElection = {
      key: "2",
        title: String(token[1]),
        description: String(token[2]),
        endtime: String(token[3]),
        candidates: [
          { key: "1", name: "1", votes: 10, total: 70 },
          { key: "2", name: "2", votes: 20, total: 70 },
          { key: "3", name: "3", votes: 40, total: 70 },
        ],
    }
    this.setState({elections_data: [...this.state.elections_data, oneElection]})
    console.log(this.state.elections_data)
    this.updatePanes()
    // electionsData.push(oneElection);
    // this.jsonData = JSON.stringify(electionsData);

    // let dataStr = JSON.stringify(electionsData);
    // let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    // let exportFileDefaultName = 'data.json';
    // let linkElement = document.createElement('a');
    // linkElement.setAttribute('href', dataUri);
    // linkElement.setAttribute('download', exportFileDefaultName);
    // linkElement.click();

  }

  

  openTab = (record) => {
    console.log("hi");
    console.log(record.title);
  };

  

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = (record) => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    const newPanes = [...panes];
    newPanes.push({
      title: record.title,
      content: <Election record={record}></Election>,
      key: activeKey,
      closable: true,
    });
    this.setState({
      panes: newPanes,
      activeKey,
    });
  };

  remove = (targetKey) => {
    const { panes, activeKey } = this.state;
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    this.setState({
      panes: newPanes,
      activeKey: newActiveKey,
    });
  };

  render() {
    console.log(this.state)
    const { panes, activeKey } = this.state;
    return (
      <Tabs
        hideAdd
        type="editable-card"
        onChange={this.onChange}
        onEdit={this.onEdit}
        activeKey={activeKey}
      >
        {panes && panes.map((pane) => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

export default ElectionTab;
