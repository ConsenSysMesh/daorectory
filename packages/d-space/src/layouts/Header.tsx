import React from 'react';
import {Layout, Menu, Avatar, Input} from 'antd';
import Spacer from "../components/Spacer";
import { NavLink, useLocation } from "react-router-dom";
import { Pages } from "../config/constants";
import { Routes } from "../routes/Router";
import { SearchOutlined } from '@ant-design/icons';

const { Header: AntdHeader } = Layout;

const Header = () => {
  const { pathname } = useLocation();
  const myProfileRoute = `/${Pages.Punk}/someid`;

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
      <Input placeholder="Search..." className="Header--input" prefix={<SearchOutlined />}  />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
        <Menu.Item key={myProfileRoute} style={{ width: 150 }}>
          <NavLink to={myProfileRoute}>
            <Avatar
              src="https://lh3.googleusercontent.com/GD12XpZ4TUHe3tgStlzewrwm27j40AVdv8vvZbCmWfTFzLBHvIsGSVfNYSz0_kKWVg3aDNQAbF2pTuLEFWUus2EZrA7eLiZYAB_kAA=s0"
            /> My Profile
          </NavLink>
        </Menu.Item>
      </Menu>
    </AntdHeader>
  );
}
export default Header;
