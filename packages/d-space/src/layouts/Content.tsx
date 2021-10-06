import React, { FunctionComponent } from 'react';
import { Layout} from "antd";
import classNames from "classnames";

const { Content: AntdContent } = Layout;

type ContentProps = {
  className: string,
}

const Content: FunctionComponent<ContentProps> = ({ className, ...otherProps }) =>
  <AntdContent className={classNames('Content', className)} {...otherProps} />;
export default Content;
