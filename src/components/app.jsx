import React from 'react';
import axios from 'axios';
import { Layout, Menu, Breadcrumb, Row, Col, Icon, Modal, Button, Input } from 'antd';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dash from './dash.jsx';
import NewProgram from './newProgram.jsx';
import PublishProgram from './publishProgram.jsx';
import { requestData, logout } from 'REDUX/actions/user.jsx';
import 'MOCKJS';
import 'ASSETS/less/app.less'

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
      current: 'newProgram',
      openKeys: ['program'],
      passwdDlg: false
    };
  }
  componentDidMount() {
    console.log(this.props);
    if (!this.props.isLogin) {
      this.props.history.push('/login');
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    if (!nextProps.isLogin) {
      nextProps.history.push('/login');
    }
  }
  onOpenChange(openKeys) {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys(key) {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  }
  menuClick(e) {
    console.log(e.key);
    this.setState({
      current: e.key
    }, function () {
      console.log(this.state.current);
    });
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
    // setTimeout(() => {
    //   this.setState({ loading: false, passwdDlg: false });
    // }, 3000);
    this.request(1);
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
    console.log("senddata");
    this.props.sendData();
  }
  render() {
    return (<div style={{ height: '100vh' }}>
      <Layout>
        <Header>
          <Row>
            <Col xs={24} lg={4}>
              <img alt="logo" src="ASSETS/imgs/logo.svg" className="logo" />
            </Col>
            <Col xs={0} lg={20}>
              <div className="user">
                <Menu mode="horizontal" className="menu">
                  <SubMenu key="" title={<span><Icon type="user" />Admin</span>}>
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
          <Sider breakpoint="lg" style={{ backgroundColor: 'white' }} collapsedWidth="0">
            <Menu mode="inline" style={{ height: 'calc(100vh - 142px)' }} openKeys={this.state.openKeys} onClick={this.menuClick.bind(this)} onOpenChange={this.onOpenChange.bind(this)} selectedKeys={[this.state.current]} >
              <Menu.Item key="dash">
                <Link to="/dash">仪表板</Link>
              </Menu.Item>
              <SubMenu key="program" title="节目管理">
                <Menu.Item key="newProgram">
                  <Link to="/newProgram">新建节目</Link>
                </Menu.Item>
                <Menu.Item key="publishProgram">
                  <Link to="/publishProgram">发布节目</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="material" title="素材管理">
                <Menu.Item key="upload">
                  <Link to="/dash">上传素材</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", height: 'calc(100vh - 184px)', color: "green" }}>
              <Route path="/dash" component={Dash} />
              <Route path="/newProgram" component={NewProgram} />
              <Route path="/publishProgram" component={PublishProgram} />
              <div style={{ fontSize: 30, padding: '100 0', textAlign: 'center' }}>
                <h3>数据：{this.props.posts ? this.props.posts.data.data : '无数据' }</h3>
                <Button onClick={this.send.bind(this)}>saga异步获取数据</Button>
              </div>
            </div>
            <div style={{ padding: '0 20' }}>
              <Modal
                visible={this.state.passwdDlg}
                title="修改密码"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                footer={[
                  <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>
                    取消
                  </Button>,
                  <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
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
        <Footer style={{ textAlign: 'center', fontSize: 20 }}>
          园区物联网平台 版权所有 © 2017 由 XXX科技有限责任公司 支持
        </Footer>
      </Layout>
    </div>);
  }
}

function mapStateToProp(state) {
  return {
    isLogin: state.loginReducer.isLogin,
    posts: state.loginReducer.posts
  };
}

function mapDispatchToProp(dispatch) {
  return {
    logout: (data) => {
      dispatch(logout(data));
    },
    sendData: (data) => {
      dispatch(requestData(data));
    }
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(App);
