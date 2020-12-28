import { Table, Space, Button, Tabs } from "antd";
import React from "react";
import Election from "./Election.js";
import Elections from '../abis/Elections.json'
import Web3 from 'web3'

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
      elections_contract: [],
      candidates_data: [],
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
    this.initialPanes = [
      {
        title: "Home",
        content: (
          <Table dataSource={this.state.elections_data}>
            <Column title="Id" dataIndex="key" key="key" />
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
    this.setState({activeKey: this.initialPanes[0].key, panes: this.initialPanes})
    
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
    var election_count = await this.state.elections_contract.methods.election_count.call().call();
    var i;
    for (i = 0; i < election_count; i++) {
      var candidateObj = [];
      var oneElectionData = await this.state.elections_contract.methods.getElection(i).call();
      for (var j = 0; j < oneElectionData[4]; j++) {
        var candidateData = await this.state.elections_contract.methods.getCandidate(i, j).call();
        let oneCandidateObj = { key:candidateData[0], name: candidateData[1], votes: candidateData[2]};
        candidateObj.push(oneCandidateObj);
      }
      let oneElection = {
        key: oneElectionData[0],
        title: String(oneElectionData[1]),
        description: String(oneElectionData[2]),
        endtime: String(oneElectionData[3]),
        candidates: candidateObj,   
      }
      this.setState({elections_data: [...this.state.elections_data, oneElection]})   
    }
    this.updatePanes()
  }

  resetState = () => {
    this.setState({
      activeKey:null,
      panes: null,
      account: '',
      elections_data: [],
      elections_contract: [],
      candidates_data: [],
    }, ()=>{
      this.loadBlockchainData()
    })
  }

  onChange = (activeKey) => {
    this.setState({ activeKey: activeKey });
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
      content: <Election record={record} resetState={this.resetState}></Election>,
      key: activeKey,
      closable: true,
    });
    this.setState({
      panes: newPanes,
      activeKey: activeKey,
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
