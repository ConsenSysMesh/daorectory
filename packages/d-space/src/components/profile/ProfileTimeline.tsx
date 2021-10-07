import React from 'react';
import {Timeline} from "antd";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import ProfileCard from "./ProfileCard";

const ProfileTimeline = () => {
  return (
    <Timeline>
      <Timeline.Item dot={<CalendarOutlined style={{ fontSize: '16px' }} />}>2021</Timeline.Item>
      <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>Sept 21</Timeline.Item>
      <Timeline.Item>
        <ProfileCard title="Some title" />
      </Timeline.Item>
      <Timeline.Item>
        <ProfileCard title="Some title" />
      </Timeline.Item>
      <Timeline.Item>
        <ProfileCard title="Some title" />
      </Timeline.Item>
      <Timeline.Item>
        <ProfileCard title="Some title" />
      </Timeline.Item>
      <Timeline.Item>
        <ProfileCard title="Some title" />
      </Timeline.Item>
      <Timeline.Item />
    </Timeline>
  );
};

export default ProfileTimeline;