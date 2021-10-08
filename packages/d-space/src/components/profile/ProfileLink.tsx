import React, { FC, useMemo } from 'react';
import { Avatar, Button, Badge } from "antd";
import classNames from 'classnames';
import { TrophyOutlined } from '@ant-design/icons';
import { SizeType } from "antd/lib/config-provider/SizeContext";

type Props = {
  title: string
  size?: SizeType,
  badgeCount?: number,
  isTile?: boolean,
}

const ProfileLink: FC<Props> = ({
  title,
  size,
  badgeCount,
  isTile = false,
}) => {
  const avatarSize = useMemo(() => {
    if (size === 'small') return 20;
    if (size === 'large') return 32;
    if (isTile) return 80;
    return 24;
  }, [size, isTile]);

  const className = classNames('ProfileLink', {
    'ProfileLink--tile': isTile,
  });

  return (
    <Button size={size} type="text" className={className}>
      <Avatar
        size={avatarSize}
        src="https://lh3.googleusercontent.com/GD12XpZ4TUHe3tgStlzewrwm27j40AVdv8vvZbCmWfTFzLBHvIsGSVfNYSz0_kKWVg3aDNQAbF2pTuLEFWUus2EZrA7eLiZYAB_kAA=s0"
      /> <div className="ProfileLink--title">{title} {badgeCount && <Badge className="ProfileLink--badge" count={<><TrophyOutlined /> {badgeCount}</>} />}</div>
    </Button>
  );
};

export default ProfileLink;
