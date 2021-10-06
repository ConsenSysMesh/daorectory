import React from 'react';
import Router from "./routes/Router";
import { Layout } from "antd";
import Header from "./layouts/Header";
import Background from "./layouts/Background";
import Content from "./layouts/Content";

const App = () => (
  <Layout className="App">
    <Background />
    <Header />
    <Content className="App--content">
      <Router />
    </Content>
  </Layout>
);

export default App;
