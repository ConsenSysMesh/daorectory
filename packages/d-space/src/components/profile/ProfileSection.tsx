import React, { FC } from 'react';
import classNames from 'classnames';

type Props = {
  className?: string,
  spaced?: boolean,
}

const ProfileSection: FC<Props> = ({
  className: providedClassName,
  children,
  spaced = false,
}) => {
  const className = classNames('ProfileSection', providedClassName, {
    'ProfileSection-spaced': spaced,
  });
  return (
    <div className={className}>{children}</div>
  );
};

export default ProfileSection;
