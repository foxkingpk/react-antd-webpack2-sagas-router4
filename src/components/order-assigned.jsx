import React from 'react';
import API from '../api/index';
import { Table, message, Input } from 'antd';
import OrderDetail from './order-detail';

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
      pageTotal: 0,
      selectedRowKeys: [],
      pagination: {
        current: 1,
        pageSize: 10
      },
      orderDetailData: {
        disableEdit: false
      },
      data: [],
      loading: false
    };
  }
  componentDidMount() {
    document.title = '已分配订单';
    this.request({
      page: 1,
      pageSize: 10
    });
  }  
  request(payload) {
    this.setState({
      loading: true
    });

    API.getAssignedOrdersResource(payload).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          data: res.data.data,
          loading: false,
          pageTotal: res.data.total,
          selectedRowKeys: []
        });
      } else {
        this.setState({
          data: [],
          loading: false
        });
        message.error('获取未分配订单操失败！');
      }
    });
  }
  onRowClick(record) {
    API.getOrderDetailResource({ orderID: record.id }).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          ...this.state,
          orderDetailData: {
            ...this.state.orderDetailData,
            ...res.data.data
          }
        });
      } else {
        message.error('获取订单详情失败！');
      }
    });
  }
  handleTableChange(pagination) {
    this.request({
      page: pagination.current,
      pageSize: pagination.pageSize,
      orderID: this.state.queryKey
    });
  }
  onSelectChange(selectedRowKeys) {
    this.setState({
      ...this.state,
      selectedRowKeys
    });
  }
  onShowSizeChange(current, size) {
    this.setState({
      ...this.state,
      pagination: {
        current,
        pageSize: size
      }
    });
  }
  onPaginationChange(page, pageSize) {
    this.setState({
      ...this.state,
      pagination: {
        current: page,
        pageSize
      }
    });
  }
  onSearch(value) {
    this.setState({
      ...this.state,
      queryKey: value,
      pagination: {
        ...this.state.pagination,
        current: 1
      }
    });
    this.request({
      orderID: value,
      page: 1,
      pageSize: this.state.pagination.pageSize
    });
  }
  render() {
    const pagination = {
      total: this.state.pageTotal,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['10', '20', '30', '40', '100'],
      current: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
      onChange: this.onPaginationChange.bind(this),
      onShowSizeChange: this.onShowSizeChange.bind(this)
    };
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange.bind(this)
    };
    return (<div>
      <div className="clearfix" style={{ marginBottom: 12 }}>
        <div style={{ float: 'right', marginRight: 12 }}>
          <Search placeholder="请输入快递单号" onSearch={this.onSearch.bind(this)} />
        </div>
      </div>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange.bind(this)}
        scroll={{ x: 1500 }}
        rowSelection={rowSelection}
        onRowClick={this.onRowClick.bind(this)}
      />
      <OrderDetail {...this.state.orderDetailData} />
    </div>);
  }
}

export default OrderAssigned;
