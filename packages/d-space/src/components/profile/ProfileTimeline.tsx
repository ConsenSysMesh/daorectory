import React from 'react';
import {Timeline} from "antd";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import ProfileCard from "./ProfileCard";

const ProfileTimeline = () => {
  return (
    <Timeline className="ProfileTimeline">
      <Timeline.Item className="ProfileTimeline--year" dot={<CalendarOutlined />}>2021</Timeline.Item>
      <Timeline.Item className="ProfileTimeline--month" dot={<ClockCircleOutlined />}>Sept 21</Timeline.Item>
      <Timeline.Item className="ProfileTimeline--item">
        <ProfileCard title="Some title" />
      </Timeline.Item>
      <Timeline.Item className="ProfileTimeline--item">
        <ProfileCard title="Some title" />
      </Timeline.Item>
      <Timeline.Item className="ProfileTimeline--item">
        <ProfileCard title="Some title" />
      </Timeline.Item>
      <Timeline.Item className="ProfileTimeline--item">
        <ProfileCard title="Some title" />
      </Timeline.Item>
      <Timeline.Item className="ProfileTimeline--item">
        <ProfileCard title="Some title" />
      </Timeline.Item>
    </Timeline>
  );
};

export default ProfileTimeline;