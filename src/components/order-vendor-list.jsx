import React from 'react';
import API from 'API';
import { Modal, Button, Table } from 'antd';
import PropTypes from 'prop-types';

class OrderVendorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: { total: 100 },
      data: [],
      loading: false,
      selectedRowKeys: []
    };
  }
  componentDidMount() {
    this.request();
  }
  onSelectChange(selectedRowKeys, selectedRows) {
    console.log(selectedRowKeys, selectedRows);
    this.setState({
      ...this.state,
      selectedRowKeys
    });
  }
  request(payload) {
    this.setState({
      loading: true
    });

    API.getOrderVendorsResource(payload).then((res) => {
      this.setState({
        ...this.state,
        data: res.data.data,
        loading: false,
        selectedRowKeys: []
      });
    });
  }
  handleTableChange(pagination) {
    this.request({
      page: pagination.current,
      pageSize: pagination.pageSize
    });
  }
  handleOk() {
    this.props.data.handleOk(this.state.selectedRowKeys);
  }
  render() {
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange.bind(this)
    };
    const columns = [{
      title: '编号',
      key: 'id',
      dataIndex: 'id'
    }, {
      title: '厂商名称',
      key: 'vendor',
      dataIndex: 'vendor'
    }, {
      title: '库存余量',
      key: 'inventory',
      dataIndex: 'inventory'
    }];

    return (<Modal
      visible
      style={{ top: '50%', marginTop: '-289px' }}
      title="选择订单分配商家"
      onOk={this.handleOk.bind(this)}
      onCancel={this.props.data.handleCancel}
      layout="horizontal"
      maskClosable={false}
      footer={[
        <Button key="back" size="large" onClick={this.props.data.handleCancel}>
        取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          size="large"
          loading={this.props.data.confirmLoading}
          onClick={this.handleOk.bind(this)}
        >
          确定
        </Button>
      ]}
    >
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        rowSelection={rowSelection}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange.bind(this)}
      />
    </Modal>);
  }
}
OrderVendorList.propTypes = {
  data: PropTypes.object.isRequired
};
export default OrderVendorList;
