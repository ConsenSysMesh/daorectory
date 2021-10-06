import React from 'react';
import {Layout, Menu, Avatar, Input} from 'antd';
import Spacer from "../components/Spacer";
import { NavLink, useLocation } from "react-router-dom";
import { Pages } from "../config/constants";

const { Header: AntdHeader } = Layout;

const Header = () => {
  const { pathname } = useLocation();

  return (
    <AntdHeader className="Header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
        <Menu.Item key="/doas">
          <NavLink to={`/${Pages.Doas}`}>DAO Directory</NavLink>
        </Menu.Item>

        <Menu.Item key="/punks">
          <NavLink to={`/${Pages.Punks}`}>
            Punk Directory
          </NavLink>
        </Menu.Item>
      </Menu>
      <Spacer />
      <Input placeholder="Search..." className="Header--input" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
        <Menu.Item key="/dao/someid" style={{ width: 150 }}>
          <NavLink to={`/${Pages.Doa}/someid`}>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> My Profile
          </NavLink>
        </Menu.Item>
      </Menu>
    </AntdHeader>
  );
}
export default Header;
