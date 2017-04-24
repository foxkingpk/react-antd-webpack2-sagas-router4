import React from 'react';
import { Button, Input } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from 'REDUX/actions/user.jsx';

class Login extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
  }

  login() {
    this.props.login("login");
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.props.isLogin) {
      return (<Redirect to={from.pathname} />);
    }
    return (
      <div style={{ height: '100vh', background: 'rgba(0, 0, 0, .5)' }}>
        <div style={{ width: 300, height: 280, background: 'white', boxShadow: '0 0 100px rgba(0,0,0,.6)', borderRadius: 5, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <div style={{ height: '100%', padding: '0 20px' }}>
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <img alt="logo" src="ASSETS/imgs/logo.svg" style={{ width: 80, verticalAlign: 'middle' }} />
            </div>
            <div style={{ marginTop: 20 }}>
              <Input size="large" placeholder="请输入用户名" />
            </div>
            <div style={{ marginTop: 20 }}>
              <Input size="large" placeholder="请输入密码" />
            </div>
            <div style={{ position: 'absolute', bottom: 10, left: 0, width: '100%', padding: '0 20px' }}>
              <Button type="primary" onClick={this.login.bind(this)} style={{ width: '100%' }}>登录</Button>
            </div>
          </div>
        </div>
      </div>);
  }
}
function mapStateToProp(state) {
  return {
    isLogin: state.userReducer.isLogin
  };
}
function mapDispatchToProp(dispatch) {
  return {
    login: (data) => {
      dispatch(login(data));
    }
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(Login));
