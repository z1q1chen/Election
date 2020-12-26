import { Tabs } from "antd";
import CreateElectionTab from "./CreateElectionTab";
import React from "react";

const { TabPane } = Tabs;

class AdminTab extends React.Component {
  state = {
    tabPosition: "left",
  };

  render() {
    const { tabPosition } = this.state;
    return (
      <>
        <Tabs tabPosition={tabPosition}>
          <TabPane tab="Create Election" key="1">
            <CreateElectionTab></CreateElectionTab>
          </TabPane>
          {/* <TabPane tab="Modify Election" key="2">
            <ModifyElectionTab></ModifyElectionTab>
          </TabPane> */}
        </Tabs>
      </>
    );
  }
}

export default AdminTab;
