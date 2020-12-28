import { Table, Space, Button, Tabs } from "antd";
import React from "react";
import Election from "./Election.js";

const { Column } = Table;

const { TabPane } = Tabs;

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


class ElectionTab extends React.Component {
  newTabIndex = 0;

  openTab = (record) => {
    console.log("hi");
    console.log(record.title);
  };

  initialPanes = [
    {
      title: "Home",
      content: (
        <Table dataSource={dataSource}>
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

  state = {
    activeKey: this.initialPanes[0].key,
    panes: this.initialPanes,
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
    const { panes, activeKey } = this.state;
    return (
      <Tabs
        hideAdd
        type="editable-card"
        onChange={this.onChange}
        onEdit={this.onEdit}
        activeKey={activeKey}
      >
        {panes.map((pane) => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

export default ElectionTab;
