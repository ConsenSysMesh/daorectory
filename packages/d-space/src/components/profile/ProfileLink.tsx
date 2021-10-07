import React, { FC, useMemo } from 'react';
import { Avatar, Button, Badge } from "antd";
import classNames from 'classnames';
import { TrophyOutlined } from '@ant-design/icons';

type Props = {
  title: string
  size?: string,
  badgeCount?: number,
}

const ProfileLink: FC<Props> = ({ title, size = 'small', badgeCount }) => {
  const avatarSize = useMemo(() => {
    if (size === 'small') return 20;
    if (size === 'large') return 80;
    return 32;
  }, [size]);

  const className = classNames('ProfileLink', {
    [`ProfileLink-${size}`]: size,
  });

  return (
    <Button size="small" type="text" className={className}>
      <Avatar
        size={avatarSize}
        src="https://lh3.googleusercontent.com/GD12XpZ4TUHe3tgStlzewrwm27j40AVdv8vvZbCmWfTFzLBHvIsGSVfNYSz0_kKWVg3aDNQAbF2pTuLEFWUus2EZrA7eLiZYAB_kAA=s0"
      /> <div className="ProfileLink--title">{title} {badgeCount && <Badge className="ProfileLink--badge" count={<><TrophyOutlined /> {badgeCount}</>} />}</div>
    </Button>
  );
};

export default ProfileLink;
