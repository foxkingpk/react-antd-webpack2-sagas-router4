import React from 'react';
import { Button, message, notification, Card } from 'antd';
import API from 'API';
import mLODOP from 'UTILS/print.js';

class PrinterManager extends React.Component {
  constructor() {
    super();
    this.state = { printer: '', checkMsg: '', checkCMsg: '' };
  }
  componentDidMount() {
    API.getDefaultPrinter().then((res) => {
      this.setState({
        printer: res.data.data.printer
      });
    });
  }
  changeDefaultPrinter() {
    API.changeDefaultPrinter().then((res) => {
      message.success('修改默认打印机成功！');
    });
  }
  checkIsInstall() {
    let msg = '没有检测到打印插件，请确保打印程序已安装，或者打印程序已经启动运行！如需帮助，请联系029-90879090';
    let cmsg = msg;
    if (mLODOP.getMLodop()) {
      if (LODOP.VERSION < '6.2.1.7') {
        msg = '当前Lodop控件版本号：' + LODOP.VERSION + '需要升级至最新版本！';
      } else {
        msg = '当前Lodop控件可用!Lodop版本号：' + LODOP.VERSION;
      }
      if (CLODOP.CVERSION < '2.1.0.2') {
        cmsg = '当前C-Lodop控件版本号：' + CLODOP.CVERSION + '需要升级至最新版本！';
      } else {
        cmsg = '当前C-Lodop云打印可用!C-Lodop版本号：' + CLODOP.CVERSION;
      }
    } else {
      cmsg= '';
      notification.error({
        message: '错误提示',
        description: '没有检测到打印插件，请确保打印程序已安装，或者打印程序已经启动运行！'
      });
    }

    this.setState({
      checkMsg: msg,
      checkCMsg: cmsg
    });
  }

  render() {
    return (<div>
      <div style={{ fontSize: 20, margin: '20px 0', color: '#000' }}>
        <h3>打印机管理</h3>
        <ul className="clearfix">
          <li style={{ float: 'left', margin: '10px' }} key="default">
            <Card className="senderItem" title="修改默认打印机" extra={<a href="javascript:;" onClick={this.changeDefaultPrinter.bind(this)}>修改</a>} style={{ width: 300, height: 210 }}>
              <p>当前设置的默认打印机是:</p>
              <p style={{ margin: '8px 20px' }}>{this.state.printer}</p>
              <select id="printerChoose" className="ant-select ant-select-selection ant-select-selection--single" defaultValue="请选择打印机" style={{ display: 'inline-block', width: 220, marginTop: 8 }}>
              </select>
            </Card>
          </li>
          <li style={{ float: 'left', margin: '10px' }} key="check">
            <Card className="senderItem" title="检测打印插件是否安装" extra={<a href="javascript:;" onClick={this.checkIsInstall.bind(this)}>检测</a>} style={{ width: 300, height: 210 }}>
              <p style={{ fontSize: 14 }}>{this.state.checkMsg}</p>
              <p style={{ fontSize: 14, marginTop: 14 }}>{this.state.checkCMsg}</p>
            </Card>
          </li>
        </ul>
      </div>
      <div style={{ fontSize: 20, margin: '20px 0', color: '#000' }}>
        <h3>打印机安装程序</h3>
        <div style={{ fontSize: 14, margin: '12px' }}>
          <p>下载地址：<a className="ant-btn ant-btn-primary" style={{ marginLeft: 5, lineHeight: '26px' }} target="_blank" href="//cdn.kuaidi100.com/download/lodop/CLodopPrint_Setup_for_Win32NT.exe">点我安装</a>，安装成功后，请<a className="ant-btn ant-btn-primary" style={{ marginLeft: 8, lineHeight: '26px' }} href="javascript:;" onClick={() => { window.location.reload(); }}>刷新页面</a></p>
        </div>
      </div>
    </div>);
  }
}

export default PrinterManager;
