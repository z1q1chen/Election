import { Table, Space, Button, Typography } from "antd";
import React from "react";
import { Progress } from "antd";
import Elections from '../abis/Elections.json'
import Web3 from 'web3'
import moment from 'moment'

// Init typography and table
const { Title, Paragraph } = Typography;
const { Column } = Table;

// const salesPieData = [
//   {
//     x: '家用电器',
//     y: 4544,
//   },
//   {
//     x: '食用酒水',
//     y: 3321,
//   },
//   {
//     x: '个护健康',
//     y: 3113,
//   },
//   {
//     x: '服饰箱包',
//     y: 2341,
//   },
//   {
//     x: '母婴产品',
//     y: 1231,
//   },
//   {
//     x: 'key',
//     y: 1231,
//   },
// ];

class Election extends React.Component {
  // Used to verify if user has already voted
  localstoragekey = null

  constructor(props) {
    super(props)

    // Count total votes, to show percentage later
    var total = 0
    this.props.record.candidates.forEach(e => {
      total += +e.votes
    })

    this.state = {
      total: total,
      voted: false,
      ended: false,
      hide: true,
      account: '',
      elections_contract: [],
      record: this.props.record
    }

    this.loadWeb3()
    this.loadBlockchainData()
  }

  // Load web3
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

  // load blockchain data
  loadBlockchainData = async () => {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()

    this.setState({ account: accounts[0] })

    // Set localstorage key
    this.localstoragekey = "voted" + this.props.record.key + accounts[0];
    const voted = localStorage.getItem(this.localstoragekey) || 0;
    this.setState({ voted: voted })
    // Network ID
    const networkId = await web3.eth.net.getId()
    // Network Data
    const networkData = Elections.networks[networkId]
    // Proceed if network exists
    if (networkData) {
      // Get contract, set state
      const elections_contract = new web3.eth.Contract(Elections.abi, networkData.address)
      this.setState({ elections_contract: elections_contract }, () => {
        const end_time = moment(this.state.record.endtime, "dddd, MMMM Do YYYY, h:mm:ss a")
        const current_time = moment()
        if (current_time.isBefore(end_time)){
          this.setState({ hide: false })
        } else {
          // The election is ended
          this.setState({ hide: true, ended: true, record: {...this.state.record, endtime: "The election is ended."} })
        }
      })
    }
  }


  vote = async (CandidateRecord) => {
    if (this.state.elections_contract) {
      // Vote by election id and candidate id
      this.state.elections_contract.methods.vote(this.props.record.key, CandidateRecord.key).send({ from: this.state.account }).then(() => {
        // Set voted to true in state and localstorage
        this.setState({ voted: true });
        localStorage.setItem(this.localstoragekey, true);
        this.update();
        this.props.resetState()
      });
    }
  };

  update = async () => {
    var oneElectionData = await this.state.elections_contract.methods.getElection(this.props.record.key).call();
    var candidateObj = [];
    for (var j = 0; j < oneElectionData[4]; j++) {
      var candidateData = await this.state.elections_contract.methods.getCandidate(this.props.record.key, j).call();
      let oneCandidateObj = { key: candidateData[0], name: candidateData[1], votes: candidateData[2] };
      candidateObj.push(oneCandidateObj);
    }
    let oneElection = {
      key: oneElectionData[0],
      title: String(oneElectionData[1]),
      description: String(oneElectionData[2]),
      endtime: String(oneElectionData[3]),
      candidates: candidateObj,
    }
    this.setState({ record: oneElection })
  }


  render() {
    return (
      <Typography>
        <Title>{this.state.record.title}</Title>
        <Paragraph>{this.state.record.description}</Paragraph>
        <Paragraph>End Time: {this.state.record.endtime}</Paragraph>
        <Paragraph>
          <Table dataSource={this.state.record.candidates}>
            <Column title="Candidates" dataIndex="name" key="name" />
            {this.state.voted || this.state.ended? (
              <Column
                title="Result"
                key="result"
                render={(CandidateRecord) => (
                  <Progress
                    strokeLinecap="square"
                    percent={Math.round(
                      (CandidateRecord.votes / this.state.total) * 100
                    )}
                    status="normal"
                  />
                )}
              />
            ) : (
                <Column
                  title="Action"
                  key="action"
                  render={(CandidateRecord) => (
                    <Space size="middle">
                      <Button
                        type="primary"
                        ghost
                        hidden={this.state.hide}
                        onClick={() => this.vote(CandidateRecord)}
                      >
                        Vote
                    </Button>
                    </Space>
                  )}
                />
              )}
          </Table>
        </Paragraph>
      </Typography>
      // ,
      // <Pie
      //   hasLegend
      //   title="销售额"
      //   subTitle="销售额"
      //   total={() => (
      //     <span
      //       dangerouslySetInnerHTML={{
      //         __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0)),
      //       }}
      //     />
      //   )}
      //   data={salesPieData}
      //   valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
      //   height={294}
      // />
    );

  }
}

export default Election;
