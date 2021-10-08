import React from 'react';
import { Layout, Menu } from 'antd';
import Spacer from "../components/Spacer";
import { NavLink, useLocation } from "react-router-dom";
import { Routes } from "../routes/Router";

const { Header: AntdHeader } = Layout;

const Header = () => {
  const { pathname } = useLocation();

  return (
    <AntdHeader className="Header">
      <a href="https://sobol.io/" target="_blank"  rel="noreferrer">
        <img alt="Sobol" src="/logo-dark.png" className="Header--logo" />
      </a>
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]} className="Header--menu">
        <Menu.Item key={Routes.Daos}>
          <NavLink to={Routes.Daos}>DAO Directory</NavLink>
        </Menu.Item>

        <Menu.Item key={Routes.Punks}>
          <NavLink to={Routes.Punks}>
            Punk Directory
          </NavLink>
        </Menu.Item>
      </Menu>
      <Spacer />
    </AntdHeader>
  );
}
export default Header;
