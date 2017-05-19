import React from 'react';
import API from 'API';
import { Table, Icon, Row, Col, Input, Select } from 'antd';
import 'ASSETS/less/orderlistnew.less';

const Search = Input.Search;

const columns = [{
  title: '编号',
  key: 'id',
  dataIndex: 'id'
}, {
  title: '宝贝名称',
  key: 'goodsName',
  dataIndex: 'goodsName'
}, {
  title: '订单编号',
  key: 'orderID',
  dataIndex: 'orderID'
}, {
  title: '买家昵称',
  key: 'nickname',
  dataIndex: 'nickname'
}, {
  title: '收件人',
  key: 'reciver',
  dataIndex: 'reciver'
}, {
  title: '手机号',
  key: 'phone',
  dataIndex: 'phone'
}, {
  title: '街道地址',
  key: 'address',
  dataIndex: 'address'
}, {
  title: '快递',
  key: 'express',
  dataIndex: 'express'
}, {
  title: '订单分配状态',
  key: 'assign',
  dataIndex: 'assign',
  width: 100,
  fixed: 'right'
}, {
  title: '发货商家',
  key: 'vendor',
  dataIndex: 'vendor',
  width: 100,
  fixed: 'right'
}];
class OrderAssigned extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      pagination: { total: 50, showSizeChanger: true, showQuickJumper: true },
      data: [],
      loading: false
    };
  }
  componentDidMount() {
    this.request();
  }  
  request(payload) {
    this.setState({
      loading: true
    });

    API.getAssignedOrdersResource(payload).then((res) => {
      console.log(res);
      this.setState({
        data: res.data.data,
        loading: false
      });
    });
  }
  handleTableChange(pagination) {
    console.log('handleTableChange:', pagination);
    this.request({
      page: pagination.current,
      pageSize: pagination.pageSize
    });
  }
  onChange(value) {
    console.log("onchange",value);
  }
  render() {
    return <div className="orderListnew">
      <Row style={{ marginBottom: 12 }}>
        <Col xs={12} sm={8} lg={4} style={{ marginRight: 12 }}>
          <Search placeholder="请输入查询的收件人" onSearch={value => console.log(value)} />
        </Col>
        <Col xs={24} sm={12} lg={8} style={{ margin: '0 12px' }}>
          
        </Col>
        <Col xs={24} sm={12} lg={8}>  
        </Col>
      </Row>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange.bind(this)}
        scroll={{ x: 1500 }}
      />
    </div>;
  }
}

export default OrderAssigned;
