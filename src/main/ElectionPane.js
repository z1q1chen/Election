import React from "react";

const dataSource = [
    {
      key: "1",
      title: "a",
      description: "Demo a",
      endtime: "2020-12-31",
      candidates: [
        { key: "1", name: "1", votes: 10, total: 70 },
        { key: "2", name: "2", votes: 20, total: 70 },
        { key: "3", name: "3", votes: 40, total: 70 },
      ],
    },
    {
      key: "2",
      title: "b",
      description: "Demo b",
      endtime: "2020-12-31",
      candidates: [
        { key: "1", name: "1", votes: 10, total: 70 },
        { key: "2", name: "2", votes: 20, total: 70 },
        { key: "3", name: "3", votes: 40, total: 70 },
      ],
    },
    {
      key: "3",
      title: "c",
      description: "Demo c",
      endtime: "2020-12-31",
      candidates: [
        { key: "1", name: "1", votes: 10, total: 70 },
        { key: "2", name: "2", votes: 20, total: 70 },
        { key: "3", name: "3", votes: 40, total: 70 },
      ],
    },
  ];

class ElectionPane extends React.Component{
    state = {dataSource: dataSource}

    render(){
        return(
            <Table dataSource={this.state.dataSource}>
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
        )
    }
}