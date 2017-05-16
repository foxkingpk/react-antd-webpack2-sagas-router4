import React from 'react';
import { Select, Button, message } from 'antd';
import API from 'API';

const Option = Select.Option;
class OrdersCenter extends React.Component {
  constructor() {
    super();
    this.state = { printer: '' };
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
  render() {
    return (<div>
      <p style={{ fontSize: 20, color: '#000' }}>当前设置的默认打印机是:</p>
      <p style={{ fontSize: 20, margin: '12px 20px' }}>{this.state.printer}</p>
      <div style={{ fontSize: 20, margin: '20px 0', color: '#000' }}>
        <p>修改默认打印机:</p>
        <Select defaultValue="请选择打印机" style={{ width: 220, marginTop: 20 }}>
          <Option value="ms">Microsoft Print to PDF</Option>
          <Option value="pdf">PDF-printer</Option>
          <Option value="foxit">Foxit Reader PDF Printer</Option>
         </Select>
         <Button style={{ marginLeft: 20 }}type="primary" onClick={this.changeDefaultPrinter.bind(this)}>确认修改</Button>
       </div>
    </div>);
  }
}

export default OrdersCenter;
