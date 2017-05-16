import React from 'react';
import { Card, Badge } from 'antd';
import 'ASSETS/less/sender-item.less'

const SenderItem = ({ props, editSenderDlg }) => {
  const style = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };
  const title= <Badge count={props.default ? '默认' : ''}>
      <span style={{ fontSize: 18 }}> {props.name} </span>
    </Badge>;
  return (<Card className="senderItem" title={title} extra={<a href="javascript:;" onClick={editSenderDlg}>编辑</a>} style={{ width: 300, height: 210 }}>
    <p style={style}>所在地：{props.region.province}{props.region.city}{props.region.county}</p>
    <p style={style}>街道地址：{props.address}</p>
    <p style={style}>单位：{props.company}</p>
    <p style={style}>邮编：{props.postCode}</p>
    <p style={style}>手机：{props.phone}</p>
    <p style={style}>电话：{props.tel}</p>
  </Card>);
};

export default SenderItem;
