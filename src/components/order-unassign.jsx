import React from 'react';
import API from 'API';
import { Table, Icon, Row, Col, Input, Select } from 'antd';
import 'ASSETS/less/orderlistnew.less';
import OrderVendorList from './order-vendor-list';

const Search = Input.Search;
const Option = Select.Option;

class OrderUnassign extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      pagination: { total: 100, showSizeChanger: true, showQuickJumper: true },
      data: [],
      loading: false,
      showModal: false,
      modalData: {
        confirmLoading: false,
        handleOk: (payload) => {
          this.setState({
            ...this.state,
            modalData: {
              ...this.state.modalData,
              confirmLoading: true
            }
          });

          API.saveUnassignOrderResource(payload).then((res) => {
            this.setState({
              ...this.state,
              modalData: {
                ...this.state.modalData,
                confirmLoading: false
              }
            });
            this.hideDialog();
          });
        },
        handleCancel: () => {
          this.hideDialog();
        }
      }
    };
  }
  hideDialog() {
    this.setState({
      ...this.state,
      showModal: false
    });
  }
  componentDidMount() {
    this.request();
  }  
  request(payload) {
    this.setState({
      loading: true
    });

    API.getUnassignOrdersResource(payload).then((res) => {
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
    const columns = [{
      title: '编号',
      key: 'id',
      dataIndex: 'id',
      width: 50,
      fixed: 'left'
    }, {
      title: '宝贝名称',
      key: 'goodsName',
      dataIndex: 'goodsName',
      width: 200,
      fixed: 'left'
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
      title: '订单分配状态',
      key: 'assign',
      dataIndex: 'assign',
      width: 100,
      fixed: 'right'
    }, {
      title: '操作',
      key: 'opt',
      dataIndex: 'opt',
      width: 100,
      fixed: 'right',
      render: (text, record) => (<a href="javascript:;" onClick={(record, e) => {
        console.log("&&&&&&&&&&&&&&")
        this.setState({
          ...this.state,
          showModal: true
        });
      }}>
        <Icon type="select" style={{ marginLeft: 5 }} />分配订单
      </a>)
    }];
    return <div className="orderListnew">
      <Row style={{ marginBottom: 12 }}>
        <Col xs={12} sm={8} style={{ marginRight: 12 }}>
          <Search placeholder="请输入查询的收件人" onSearch={value => console.log(value)} />
        </Col>
        <Col xs={8} sm={8} lg={4} style={{ margin: '0 12px' }}>
          <Select className="orderPrint" placeholder="请选择订单分配状态" allowClear onChange={this.onChange.bind(this)}>
            <Option value="wait">未分配</Option>
            <Option value="finish">已退回</Option>
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
        scroll={{ x: 1500 }}
      />
      { this.state.showModal ? <OrderVendorList data={this.state.modalData} /> : '' }
    </div>;
  }
}

export default OrderUnassign;
