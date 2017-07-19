import React from 'react';
import API from '../api/index';
import { Table, Input, message, Button } from 'antd';
import UserAdd from './user-add';

const Search = Input.Search;
class Userlist extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
      pageTotal: 0,
      queryKey: '',
      collapsed: false,
      orderID: null,
      pagination: {
        current: 1,
        pageSize: 10
      },
      data: [],
      loading: false,
      showModal: false,
      modalData: {
        confirmLoading: false,
        orderSelectList: '',
        title: '新建用户',
        disableUserName: false,
        handleOk: (payload) => {
          this.setState({
            ...this.state,
            modalData: {
              ...this.state.modalData,
              confirmLoading: true
            }
          });

          API.savePrintOptionResource({ ...payload }).then((res) => {
            if (res.data.code === 200) {
              this.setState({
                ...this.state,
                modalData: {
                  ...this.state.modalData,
                  confirmLoading: false
                }
              });
              this.hideDialog();
              message.success('保存打印信息操作成功');
            } else {
              this.setState({
                ...this.state,
                modalData: {
                  ...this.state.modalData,
                  confirmLoading: false
                }
              });
              this.hideDialog();
              message.error('保存打印信息操作失败！');
            }
          });
        },
        handleCancel: () => {
            console.log("11111111111")
          this.hideDialog();
        }
      }
    };
    this.addUser = this.addUser.bind(this);
    this.delUser = this.delUser.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.editUser = this.editUser.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
  }
  componentDidMount() {
    document.title = '用户列表';
    this.request({
      page: 1,
      pageSize: 10
    });
  }
  hideDialog() {
    this.setState({
      ...this.state,
      showModal: false
    });
  }
  addUser() {
    this.setState({
      ...this.state,
      showModal: true,
      modalData: {
        ...this.state.modalData,
        title: '新建用户',
        disableUserName: false
      }
    });
  }
  delUser() {
    if (this.state.selectedRowKeys.length < 1) {
      message.error('请至少选择一项！');
      return;
    }
  }
  editUser() {
    if (this.state.selectedRowKeys.length < 1) {
      message.error('请至少选择一项！');
      return;
    }
    this.setState({
      ...this.state,
      showModal: true,
      modalData: {
        ...this.state.modalData,
        title: '编辑用户',
        disableUserName: true
      }
    });
  }
  resetPassword() {
    if (this.state.selectedRowKeys.length < 1) {
      message.error('请至少选择一项！');
      return;
    }
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
  request(payload) {
    this.setState({
      loading: true
    });

    API.getUnassignOrdersResource(payload).then((res) => {
      this.setState({
        ...this.state,
        selectedRowKeys: [],
        data: res.data.data,
        loading: false,
        pageTotal: res.data.total
      });
    });
  }
  handleTableChange(pagination) {
    this.request({
      page: pagination.current,
      pageSize: pagination.pageSize,
      userQuery: this.state.queryKey
    });
  }
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({
      ...this.state,
      selectedRowKeys
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
      onChange: this.onPaginationChange,
      onShowSizeChange: this.onShowSizeChange
    };
    const columns = [{
      title: '编号',
      key: 'id',
      dataIndex: 'id',
      width: 20
    }, {
      title: '用户名',
      key: 'userName',
      dataIndex: 'userName',
      width: 80
    }, {
      title: '手机号',
      key: 'phone',
      dataIndex: 'phone',
      width: 80
    }, {
      title: '联系人',
      key: 'contact',
      dataIndex: 'contact',
      width: 80
    }, {
      title: '库位',
      key: 'whareHouse',
      dataIndex: 'wareHouse',
      width: 100
    }];
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (<div>
      <div className="clearfix" style={{ marginBottom: 12 }}>
        <div style={{ float: 'right', marginRight: 12 }}>
          <Search placeholder="请输入用户名查询" onSearch={this.onSearch} />
        </div>
        <div style={{ float: 'left', display: 'flex' }}>
          <Button type="primary" icon="user-add" style={{ margin: '0 5px' }} onClick={this.addUser}>添加用户</Button>
          <Button type="primary" icon="user-delete" style={{ margin: '0 5px' }} onClick={this.delUser}>删除用户</Button>
          <Button type="primary" icon="edit" style={{ margin: '0 5px' }} onClick={this.editUser}>编辑用户</Button>
          <Button type="primary" icon="reload" style={{ margin: '0 5px' }} onClick={this.resetPassword}>重置密码</Button>
        </div>
      </div>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        rowSelection={rowSelection}
      />
      { this.state.showModal ? <UserAdd data={this.state.modalData} /> : '' }
    </div>);
  }
}

export default Userlist;
