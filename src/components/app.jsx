import React from 'react';
import axios from 'axios';
import { Layout, Menu, Row, Col, Icon, Modal, Button, Input } from 'antd';
import { Route, Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestData, logoutRequest } from 'REDUX/actions/user';
import { setCurrentItem, setOpenKeys } from 'REDUX/actions/menu';
import 'MOCKJS';
import 'ASSETS/less/app.less';
import Logo from 'ASSETS/imgs/logo.svg';

import OrderListNew from './orderlistnew.jsx';
import OrderListFinish from './orderlistfinish.jsx';
import PrinterManager from './printer-manager.jsx';
import SenderSetting from './sender-setting.jsx';

const { Header, Sider, Footer, Content } = Layout;
const SubMenu = Menu.SubMenu;


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      pagination: { total: 20 },
      data: [],
      loading: false,
      current: '',
      openKeys: [''],
      passwdDlg: false,
      mode: 'inline'
    };
  }
  componentDidMount() {

  }

  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => !(this.props.openKeys.indexOf(key) > -1));
    const latestCloseKey = this.props.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }

    this.props.setOpenKeys(nextOpenKeys);
  }
  onCollapse(collapsed) {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }
  getAncestorKeys(key) {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  }
  menuClick(e) {
    console.log(e.key);
    this.props.setCurrentItem(e.key);
  }
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  logout() {
    this.props.logout();
  }
  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, passwdDlg: false });
    }, 3000);
  }
  handleCancel() {
    this.setState({ passwdDlg: false });
  }
  modifyPasswd() {
    this.setState({
      passwdDlg: true
    });
  }
  request(pageNumber) {
    axios.get(`http://localhost/data${pageNumber}.txt`).then((response) => {
      const { status } = response;
      console.log(response);
      return {
        status,
        data: response.data
      };
    }).then((data) => {
      console.log(data);
      this.setState({ loading: false, passwdDlg: false });
    });
  }
  send() {
    this.props.sendData();
  }
  render() {
    if (!this.props.authenticated) {
      return (<Redirect to="/login" />);
    }
    return (<div style={{ height: '100vh' }}>
      <Layout>
        <Header>
          <Row>
            <Col xs={24} lg={4}>
              <img alt="logo" src={Logo} className="logo" />
            </Col>
            <Col xs={0} lg={20}>
              <div className="user">
                <Menu mode="horizontal" className="menu">
                  <SubMenu className="item" key="" title={<span><Icon type="user" />Admin</span>}>
                    <Menu.Item key="passwd">
                      <div onClick={this.modifyPasswd.bind(this)}>修改密码</div>
                    </Menu.Item>
                    <Menu.Item key="logout">
                      <div onClick={this.logout.bind(this)}>退出</div>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider className="sider" style={{ backgroundColor: 'white' }} collapsed={this.state.collapsed} onCollapse={this.onCollapse.bind(this)}>
            <Menu mode={this.state.mode} style={{ height: 'calc(100vh - 142px)' }} openKeys={this.props.openKeys} onClick={this.menuClick.bind(this)} onOpenChange={this.onOpenChange.bind(this)} selectedKeys={[this.props.current]} >
              <SubMenu key="ordersCenter" title={<span><Icon type="solution" /><span className="nav-text">订单中心</span></span>}>
                <Menu.Item key="orderListNew">
                  <Link to="/orderListNew">未发货订单</Link>
                </Menu.Item>
                <Menu.Item key="orderListFinish">
                  <Link to="/orderListFinish">已发货订单</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="print" title={<span><Icon type="printer" /><span className="nav-text">打印设置</span></span>}>
                <Menu.Item key="senderSetting">
                  <Link to="/senderSetting">寄件人设置</Link>
                </Menu.Item>
                <Menu.Item key="printerManager">
                  <Link to="/printerManager">打印机管理</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '24px' }}>
            <div style={{ background: '#fff', minHeight: 'calc(100vh - 190px)', color: 'green', padding: '24px' }}>
              <Route exact path="/" component={OrderListNew} />
              <Route path="/orderListNew" component={OrderListNew} />
              <Route path="/orderListFinish" component={OrderListFinish} />
              <Route path="/senderSetting" component={SenderSetting} />
              <Route path="/printerManager" component={PrinterManager} />
              {/*<div style={{ fontSize: 30, padding: '100 0', textAlign: 'center' }}>
                <h3>数据：{this.props.customData ? this.props.customData.data.payload.orderstate : '无数据' }</h3>
                <Button onClick={this.send.bind(this)}>saga异步获取数据</Button>
              </div>*/}
            </div>
            <div style={{ padding: '0 20' }}>
              <Modal
                visible={this.state.passwdDlg}
                title="修改密码"
                style={{ top: '50%', marginTop: '-139px' }}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                footer={[
                  <Button
                    key="back" size="large" onClick={this.handleCancel.bind(this)}
                  >
                    取消
                  </Button>,
                  <Button
                    key="submit" type="primary" size="large" disabled={this.props.isAuthenticating}
                    loading={this.state.loading} onClick={this.handleOk.bind(this)}
                  >
                    修改
                  </Button>
                ]}
              >
                <Input placeholder="请输入密码" style={{ marginTop: 20 }} />
                <Input placeholder="请输入新密码" style={{ marginTop: 20 }} />
                <Input placeholder="请再次输入新密码" style={{ marginTop: 20 }} />
              </Modal>
            </div>
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center', fontSize: 20, background: '#fff' }}>
          XXX订单管理系统 版权所有 © 2017 由 XXX科技有限责任公司 支持
        </Footer>
      </Layout>
    </div>);
  }
}

function mapStateToProp(state) {
  return {
    authenticated: state.userReducer.authenticated,
    isAuthenticating: state.userReducer.isAuthenticating,
    customData: state.userReducer.customData,
    current: state.menuReducer.currentItem,
    openKeys: state.menuReducer.openKeys
  };
}

function mapDispatchToProp(dispatch) {
  return {
    logout: () => {
      dispatch(logoutRequest());
    },
    sendData: (data) => {
      dispatch(requestData(data));
    },
    setOpenKeys: (data) => {
      dispatch(setOpenKeys(data));
    },
    setCurrentItem: (data) => {
      dispatch(setCurrentItem(data));
    }
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(App));
