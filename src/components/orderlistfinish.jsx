import React from 'react';
import API from 'API';
import { Table } from 'antd';

const columns = [{
  title: '编号',
  key: 'id',
  dataIndex: 'id',
  width: '20%',
  sorter: true
}, {
  title: '手机号',
  key: 'phone',
  dataIndex: 'phone'
}, {
  title: '订单时间',
  key: 'time',
  dataIndex: 'time'
}, {
  title: '地址',
  key: 'address',
  dataIndex: 'address'
}];
class OrderListFinish extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      pagination: { total: 20 },
      data: [],
      loading: false
    };
  }
  componentDidMount() {
    this.request(1);
  }
  request(pageNumber) {
    API.getOrders().then((res) => {
      console.log(res);
      this.setState({
        data: res.data.data
      });
    });
  }
  handleTableChange(pagination) {
    console.log(`handleTableChange:${this.state}`);
    this.request(pagination.current);
  }
  render() {
    return <div>
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

export default OrderListFinish;
