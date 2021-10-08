import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider as AntdProvider } from 'antd';
import { BrowserRouter as ReactRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ReactRouter>
      <AntdProvider>
        <App />
      </AntdProvider>
    </ReactRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
