import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'ASSETS/less/dashboard.less';
import avar from 'ASSETS/imgs/avar.gif';

class Dashboard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="clearfix">
          <div className="avar">
            <img src={avar} />
          </div>
          <div className="info">
            <p className="name">
              尊敬的用户<span style={{ color: 'green', margin: '0 5px' }}>{this.props.userName}</span>,欢迎您！
            </p>
            <p className="other">
              您当前还有<span className="tip">10</span>条未打印订单，<span className="tip">5</span>条未分配订单等待处理！
            </p>
          </div>
        </div>
        <div className="shortcut">
          <Link to="/orders/orderUnassign" className="btn pink-btn">未分配订单</Link>
          <Link to="/express/orderListNew" className="btn light-blue-btn">未打印订单</Link>
          <Link to="/print/printerManager" className="btn green-btn">打印机设置</Link>
          <a href="http://www.baidu.com" target="_blank" className="btn yellow-btn">搜索看看</a>
        </div>
      </div>
    );
  }
}
function mapStateToProp(state) {
  return {
    userName: state.userReducer.userName
  };
}

export default connect(mapStateToProp)(Dashboard);
