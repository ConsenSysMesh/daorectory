import React, { FC } from 'react';
import { Layout} from "antd";
import classNames from "classnames";

const { Content: AntdContent } = Layout;

type Props = {
  className: string,
}

const Content: FC<Props> = ({ className, ...otherProps }) =>
  <AntdContent className={classNames('Content', className)} {...otherProps} />;
export default Content;
