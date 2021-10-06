import React from 'react';
import {Layout, Menu, Avatar, Input} from 'antd';
import Spacer from "../components/Spacer";
import { NavLink, useLocation } from "react-router-dom";
import { Pages } from "../config/constants";
import { Routes } from "../routes/Router";

const { Header: AntdHeader } = Layout;

const Header = () => {
  const { pathname } = useLocation();
  const myProfileRoute = `/${Pages.Punk}/someid`;

  return (
    <AntdHeader className="Header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
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
      <Input placeholder="Search..." className="Header--input" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
        <Menu.Item key={myProfileRoute} style={{ width: 150 }}>
          <NavLink to={myProfileRoute}>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> My Profile
          </NavLink>
        </Menu.Item>
      </Menu>
    </AntdHeader>
  );
}
export default Header;
