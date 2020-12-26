import { Table, Space, Button, Typography } from "antd";
import React from "react";
import { Progress } from "antd";
// import { MiniProgress } from "ant-design-pro/lib/Charts";

const { Title, Paragraph } = Typography;
const { Column } = Table;

class Election extends React.Component {
  voted = localStorage.getItem("voted" + this.props.record.key) || 0;

  state = {
    voted: this.voted,
  };

  vote = (CandidateRecord) => {
    localStorage.setItem("voted" + this.props.record.key, 1);
    this.setState({ voted: true });
    console.log("voted " + CandidateRecord.name);
  };

  render() {
    return (
      <Typography>
        <Title>{this.props.record.title}</Title>
        <Paragraph>{this.props.record.description}</Paragraph>
        <Paragraph>End Time: {this.props.record.endtime}</Paragraph>
        <Paragraph>
          <Table dataSource={this.props.record.candidates}>
            <Column title="Candidates" dataIndex="name" key="name" />
            {this.state.voted ? (
              <Column
                title="Result"
                key="result"
                render={(CandidateRecord) => (
                  <Progress
                    strokeLinecap="square"
                    percent={Math.round(
                      (CandidateRecord.votes / CandidateRecord.total) * 100
                    )}
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
    );
  }
}

export default Election;
