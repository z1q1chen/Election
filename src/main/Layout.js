import {
  Layout,
  Menu,
  // Breadcrumb
} from "antd";
import "./Layout.css";
import AdminTab from "./AdminTab";
import ElectionTab from "./ElectionTab";
import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Router>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="2">
              <Link to="admin">Admin</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="election">Election</Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Content
          style={{ width: "70%", padding: "0 50px", minHeight: "500px" }}
        >
          &nbsp; &nbsp; &nbsp;
          <Route path="/admin" component={AdminTab} />
          <Route path="/election" component={ElectionTab}></Route>
        </Content>
        <Footer style={{ textAlign: "center" }}>Election Dapp</Footer>
      </Router>
    </Layout>
  );
}

export default App;
