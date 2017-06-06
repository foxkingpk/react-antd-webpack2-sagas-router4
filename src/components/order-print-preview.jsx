import React from 'react';
import API from 'API';
import { Modal, Button, Table, Form, Input, Select, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import 'ASSETS/less/order-print-preview.less';

const FormItem = Form.Item;
const Option = Select.Option;
const columns = [{
  title: '订单编号',
  key: 'id',
  dataIndex: 'id',
  width: 50
}, {
  title: '宝贝标题',
  key: 'goodsName',
  dataIndex: 'goodsName',
  width: 80
}, {
  title: '快递公司',
  key: 'orderID',
  dataIndex: 'orderID',
  width: 80
}, {
  title: '运单号',
  key: 'nickname',
  dataIndex: 'nickname',
  width: 80
}
];
class OrderPrintPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      childrensList: [],
      defaultPrinter: ''
    };
  }
  componentDidMount() {
    LODOP.Create_Printer_List(document.getElementById('printerChoose'));
    const optionList = document.getElementsByTagName('option');
    const tempList = [];
    const length = optionList.length;
    for (let index = 0; index < length; index++) {
      tempList.push({
        key: optionList[index].value,
        printer: optionList[index].text
      });
    }
    this.setState({
      defaultPrinter: '2',
      childrensList: tempList
    });

    this.request();
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
  handleOk() {
    console.log(this.props.form.getFieldsValue())
    // this.props.data.handleOk();
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
    const childrens = this.state.childrensList.map((item) => <Option key={item.key} value={item.key}>{item.printer}</Option>);
    return (<Modal
      visible={true}
      style={{ top: '50%', marginTop: '-377px' }}
      title="打印快递单"
      onOk={this.handleOk.bind(this)}
      onCancel={this.props.data.handleCancel}
      layout="horizontal"
      maskClosable={false}
      footer={[
        <Button key="preview" size="large" onClick={this.props.data.handlePreview}>
        打印
        </Button>,
        <Button
          key="submit" size="large" loading={this.props.data.confirmLoading}
          onClick={this.handleOk.bind(this)}
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
        dataSource={this.state.data}
        scroll={{ x: 1500, y: 160 }}
      />
      <Form>
        <FormItem label="打印机" {...formItemLayout}>
          {getFieldDecorator('printer', {
            initialValue: this.state.defaultPrinter
          })(
            <Select>
              {childrens}
            </Select>
          )}
        </FormItem>
        <FormItem label="发件人" {...formItemLayout}>
          {getFieldDecorator('sender', {
            initialValue: '1'
          })(
            <Select>
              <Option value="1">王海红 四川省绵阳市高新区 科创区120号孵化大楼</Option>
              <Option value="2">Lucy</Option>
              <Option value="3">yiminghe</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="物流公司" {...formItemLayout}>
          <FormItem label="" className="inline" style={{ width: 294 }}>
            {getFieldDecorator('expressCom', {
              initialValue: 'yt'
            })(
              <Select>
                <Option value="yt">圆通快递</Option>
                <Option value="sf">顺丰快递</Option>
                <Option value="zt">中通快递</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="" className="inline" {...formItemInlineLayout1} style={{ marginLeft: 14 }}>
            <Button>设置常用快递</Button>
          </FormItem>
        </FormItem>
        <FormItem label="开始运单号" {...formItemLayout}>
          <FormItem label="" className="inline" style={{ width: 294 }}>
            {getFieldDecorator('startNum', {
              initialValue: ''
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="顺序递增" className="inline" {...formItemInlineLayout1}>
            {getFieldDecorator('sortInter', {
              initialValue: 1
            })(
              <InputNumber min={1} max={10} />
            )}
          </FormItem>
        </FormItem>
        <FormItem label="纸张边距" {...formItemLayout}>
          <FormItem label="上" className="inline" {...formItemInlineLayout}>
            {getFieldDecorator('paddingUp', {
              initialValue: 5
            })(
              <InputNumber min={0} max={10} step={0.01} />
            )}
          </FormItem>
          <FormItem label="下" className="inline" {...formItemInlineLayout}>
            {getFieldDecorator('paddingDown', {
              initialValue: 1
            })(
              <InputNumber min={0} max={10} step={0.01} />
            )}
          </FormItem>
          <FormItem label="左" className="inline" {...formItemInlineLayout}>
            {getFieldDecorator('paddingLeft', {
              initialValue: 1
            })(
              <InputNumber min={0} max={10} step={0.01} />
            )}
          </FormItem>
          <FormItem label="右" className="inline" {...formItemInlineLayout}>
            {getFieldDecorator('paddingRight', {
              initialValue: 1
            })(
              <InputNumber min={0} max={10} step={0.01} />
            )}
          </FormItem>
          <span>(厘米)</span>
        </FormItem>
      </Form>
      <select id="printerChoose" style={{ display: 'none' }}>
      </select>
    </Modal>);
  }
}
OrderPrintPreview.propTypes = {
  data: PropTypes.object
};
export default Form.create()(OrderPrintPreview);
