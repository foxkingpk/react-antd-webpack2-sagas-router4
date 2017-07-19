import React from 'react';
import API from '../api/index';
import { Modal, Button, Table, Form, Input, Select, InputNumber, message } from 'antd';
import PropTypes from 'prop-types';
import '../assets/less/order-print-preview.less';

const FormItem = Form.Item;
const Option = Select.Option;
const columns = [{
  title: '订单编号',
  key: 'orderID',
  dataIndex: 'orderID',
  width: 50
}, {
  title: '宝贝标题',
  key: 'goodsName',
  dataIndex: 'goodsName',
  width: 80
}, {
  title: '快递公司',
  key: 'express',
  dataIndex: 'express',
  width: 80
}, {
  title: '运单号',
  key: 'expressNum',
  dataIndex: 'expressNum',
  width: 80
}
];
class OrderPrintPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: null,
      loading: false,
      childrensList: [],
      senderList: [],
      paperPaddingLeft: null,
      paperPaddingRight: null,
      paperPaddingUp: null,
      paperPaddingDown: null,
      express: '',
      expressNum: null,
      sortInter: null,
      printer: ''
    };
    this.handleOk = this.handleOk.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
  }
  componentDidMount() {
    window.LODOP.Create_Printer_List(document.getElementById('printerChoose'));
    const optionList = document.getElementsByTagName('option');
    const tempList = [];
    const length = optionList.length;
    for (let index = 0; index < length; index += 1) {
      tempList.push({
        key: optionList[index].value,
        printer: optionList[index].text
      });
    }
    this.setState({
      childrensList: tempList
    });
    this.request();
  }
  request() {
    this.setState({
      loading: true
    });
    // 获取寄件人信息
    API.getSendersResource().then((res) => {
      if (res.data.code === 200) {
        this.setState({
          senderList: res.data.data.list
        });
      } else {
        this.setState({
          datas: []
        });
        message.error('获取寄件人信息失败！');
      }
    });
    // 获取订单列表
    API.getPrintOrderListResource({
      orderID: this.props.data.orderSelectList
    }).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          tableData: res.data.data
        });
      } else {
        this.setState({
          data: []
        });
        message.error('获取订单信息失败！');
      }
    });
    // 获取打印详情信息
    API.getPrintOptionResource().then((res) => {
      if (res.data.code === 200) {
        this.setState({
          ...res.data.data
        });
      } else {
        message.error('获取订单信息失败！');
      }
    });
  }
  handleOk() {
    const fields = this.props.form.getFieldsValue();
    const newFields = { ...fields, startNum: fields.startNum + fields.sortInter };
    this.props.data.handleOk(newFields);
  }
  handlePreview() {
    const fields = this.props.form.getFieldsValue();
    const newFields = { ...fields, startNum: fields.startNum + fields.sortInter };
    this.props.data.handlePreview(newFields);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    const formItemInlineLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    const formItemInlineLayout1 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
    const childrens = this.state.childrensList.map(item => <Option key={item.key} value={item.printer}>{item.printer}</Option>);
    let defaultSender = '1';
    this.state.senderList.forEach((item) => { if (item.default) defaultSender = item.id.toString(); });
    return (<Modal
      visible
      style={{ top: '50%', marginTop: '-335px' }}
      title="打印快递单"
      onOk={this.handleOk}
      onCancel={this.props.data.handleCancel}
      layout="horizontal"
      maskClosable={false}
      footer={[
        <Button key="preview" size="large" onClick={this.handlePreview}>
        打印并保存
        </Button>,
        <Button
          key="submit"
          size="large"
          loading={this.props.data.confirmLoading}
          onClick={this.handleOk}
        >
          保存
        </Button>,
        <Button key="cancel" size="large" onClick={this.props.data.handleCancel}>
        取消
        </Button>
      ]}
    >
      <Table
        bordered
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.tableData}
        scroll={{ x: 1500, y: 160 }}
      />
      <Form>
        <FormItem label="打印机" {...formItemLayout}>
          {getFieldDecorator('printer', {
            initialValue: this.state.printer
          })(
            <Select>
              {childrens}
            </Select>
          )}
        </FormItem>
        <FormItem label="发件人" {...formItemLayout}>
          {getFieldDecorator('sender', {
            initialValue: defaultSender
          })(
            <Select>
              {this.state.senderList.map(item => <Option key={item.id} value={item.id.toString()}>{ item.sendName + ' ' + item.sendcity[0] + item.sendcity[1] + item.sendcity[2] + ' ' + item.sendaddr}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem label="物流公司" {...formItemLayout}>
          {getFieldDecorator('express', {
            initialValue: this.state.express
          })(
            <Select>
              <Option value="yt">圆通快递</Option>
              <Option value="sf">顺丰快递</Option>
              <Option value="zt">中通快递</Option>
            </Select>
            )}
        </FormItem>
        <FormItem label="开始运单号" {...formItemLayout}>
          <FormItem label="" className="inline" style={{ width: 294 }}>
            {getFieldDecorator('startNum', {
              initialValue: this.state.expressNum
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="顺序递增" className="inline" {...formItemInlineLayout1}>
            {getFieldDecorator('sortInter', {
              initialValue: this.state.sortInter
            })(
              <InputNumber min={1} max={10} />
            )}
          </FormItem>
        </FormItem>
        <FormItem label="纸张边距" {...formItemLayout}>
          <FormItem label="上" className="inline" {...formItemInlineLayout}>
            {getFieldDecorator('paperPaddingUp', {
              initialValue: this.state.paperPaddingUp
            })(
              <InputNumber min={0} max={10} step={0.01} />
            )}
          </FormItem>
          <FormItem label="下" className="inline" {...formItemInlineLayout}>
            {getFieldDecorator('paperPaddingDown', {
              initialValue: this.state.paperPaddingDown
            })(
              <InputNumber min={0} max={10} step={0.01} />
            )}
          </FormItem>
          <FormItem label="左" className="inline" {...formItemInlineLayout}>
            {getFieldDecorator('paperPaddingLeft', {
              initialValue: this.state.paperPaddingLeft
            })(
              <InputNumber min={0} max={10} step={0.01} />
            )}
          </FormItem>
          <FormItem label="右" className="inline" {...formItemInlineLayout}>
            {getFieldDecorator('paperPaddingRight', {
              initialValue: this.state.paperPaddingRight
            })(
              <InputNumber min={0} max={10} step={0.01} />
            )}
          </FormItem>
          <span>(厘米)</span>
        </FormItem>
      </Form>
      <select id="printerChoose" style={{ display: 'none' }} />
    </Modal>);
  }
}
OrderPrintPreview.propTypes = {
  data: PropTypes.object.isRequired
};
export default Form.create()(OrderPrintPreview);
