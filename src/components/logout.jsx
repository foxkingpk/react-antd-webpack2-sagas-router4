import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }
  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
    console.log(this.props);
  }
  render() {
    return <p>Logout</p>;
  }
}
function mapStateToProp(state) {
  return {
    isLogin: state.userReducer.isLogin
  };
}
function mapDispatchToProp(dispatch, ownprop) {
  return {
    logout: (data) => {
      dispatch({ type: 'logout', data });
    }
  };
}
const LogoutConnect = connect(mapStateToProp, mapDispatchToProp)(Logout);
export default LogoutConnect;
