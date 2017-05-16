import React from 'react';
import API from 'API';
import { Table, Icon, Row, Col, Input, Select, message } from 'antd';
import 'ASSETS/less/orderlistnew.less';

const Search = Input.Search;
const Option = Select.Option;
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
  title: '订单时间',
  key: 'time',
  dataIndex: 'time'
}, {
  title: '街道地址',
  key: 'address',
  dataIndex: 'address'
}, {
  title: '快递公司',
  key: 'express',
  dataIndex: 'express'
}, {
  title: '快递单打印状态',
  key: 'printed',
  dataIndex: 'printed'
}, {
  title: '操作',
  key: 'opt',
  dataIndex: 'opt',
  render: (text, record) => (<a href="javascript:;" onClick={()=>{
      message.info('亲，稍安勿躁，该功能还在开发中...');
    }}>
    打印<Icon type="printer" style={{ marginLeft: 5 }} />
  </a>)
}];

class OrderListNew extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      pagination: { total: 100, showSizeChanger: true, showQuickJumper: true },
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

    API.getOrderListNewResource(payload).then((res) => {
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
        <Col xs={12} sm={8} style={{ marginRight: 12 }}>
          <Search placeholder="请输入查询的收件人" onSearch={value => console.log(value)} />
        </Col>
        <Col xs={8} sm={8} lg={4} style={{ margin: '0 12px' }}>
          <Select className="orderPrint" placeholder="请选择订单打印状态" allowClear onChange={this.onChange.bind(this)}>
            <Option value="wait">未打印</Option>
            <Option value="finish">已打印</Option>
          </Select>
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
      />
    </div>;
  }
}

export default OrderListNew;
