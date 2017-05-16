import React from 'react';
import { Card } from 'antd';

const SenderItem = ({ props, editSenderDlg }) => {
  const style = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };
  return (<Card title={props.name} extra={<a href="javascript:;" onClick={editSenderDlg}>编辑</a>} style={{ width: 300, height: 210 }}>
    <p style={style}>所在地：{props.region}</p>
    <p style={style}>街道地址：{props.address}</p>
    <p style={style}>单位：{props.company}</p>
    <p style={style}>邮编：{props.postCode}</p>
    <p style={style}>手机：{props.phone}</p>
    <p style={style}>电话：{props.tel}</p>
  </Card>);
};

export default SenderItem;
