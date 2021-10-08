import React from 'react';
import Router from "./routes/Router";
import Header from "./layouts/Header";
import Background from "./layouts/Background";
import Content from "./layouts/Content";

const App = () => (
  <div className="App">
    <Background />
    <Header />
    <Content className="App--content">
      <Router />
    </Content>
  </div>
);

export default App;
