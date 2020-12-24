import { Layout, Menu, 
    // Breadcrumb 
} from 'antd';
import './Layout.css';
import Admin from './Admin'
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Link,Route, NavLink} from 'react-router-dom';

const { Header, Content, Footer } = Layout;

function App() {
    return (
        
    <Layout className="layout">
        <Router>
            <Header>
            
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="2"><Link to="admin">Admin</Link></Menu.Item>
                <Menu.Item key="3"><Link to="election">Election</Link></Menu.Item>
                {/* <Menu.Item key="3">nav 3</Menu.Item> */}
            </Menu>
            
            </Header>
            
            <Content style={{ width: '70%', padding: '0 50px', minHeight: '500px' }}>
            &nbsp;
            &nbsp;
            &nbsp;
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}

            {/* 
            /admin + election
            1. election_title: string
            2. description: string
            3. candidates: struct {candidate_name, vote_count}
            4. ending_time: date

            /election
            5. ended: boolean
            6. deleted: boolean
            7. election_id: uid
             */}

            <Route path="/admin" component={Admin}/>
            <Route path="/election" render={()=>(<div>election</div>)}></Route>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Election Dapp</Footer>
    </Router>
  </Layout>

  );
};

const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    let difference = +new Date(`10/01/${year}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;

}

export default App;