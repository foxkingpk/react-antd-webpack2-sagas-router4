import React from 'react';
import { Card, Icon } from 'antd';
import PropTypes from 'prop-types';
import '../assets/less/sender-new.less';

const SenderNew = (props) => {
  return (<Card className="senderNew" title="新增联系人" style={{ width: 300, height: 210 }}>
    <a href="javascript:;" onClick={props.newSenderDlg} ><Icon type="plus" />新增</a>
  </Card>);
};

SenderNew.propTypes = {
  newSenderDlg: PropTypes.func
};
export default SenderNew;
