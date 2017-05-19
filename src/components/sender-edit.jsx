import React from 'react';
import { Modal, Form, Button, Input, Checkbox, Cascader } from 'antd';
import city from 'UTILS/city'
import 'ASSETS/less/dialog.less'

const FormItem = Form.Item;
class SenderEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      region: '',
      address: '',
      postCode: '',
      phone: '',
      tel: ''
    };
  } 
  handleSubmit() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.data.handleOk(this.props.form.getFieldsValue());
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    const formItemLayoutLast = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 6 }
      }
    };

    return (<Modal
      visible={true}
      style={{ top: '50%', marginTop: '-262px' }}
      title={this.props.data.title}
      onOk={this.props.data.handleOk}
      onCancel={this.props.data.handleCancel}
      layout="horizontal"
      maskClosable={false}
      footer={[
        <Button key="back" size="large" onClick={this.props.data.handleCancel}>
        取消
        </Button>,
        <Button
          key="submit" type="primary" size="large" loading={this.props.data.confirmLoading}
          onClick={this.handleSubmit.bind(this)}
        >
          确定
        </Button>
      ]}
    >
      <Form layout="horizontal">
        <FormItem label="联系人" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: this.props.data.name,
            rules: [
              {
                required: true,
                message: '联系人不能为空！'
              }
            ]
          })(<Input placeholder="请输入联系人" />)}
        </FormItem>
        <FormItem label="所在地" {...formItemLayout}>
          {getFieldDecorator('region', {
            initialValue: this.props.data.region,
            rules: [
              {
                required: true,
                message: '所在地不能为空！'
              }
            ]
          })(<Cascader
            size="large"
            style={{ width: '100%' }}
            options={city}
            placeholder="请选择地址"
          />)}
        </FormItem>
        <FormItem label="街道地址" {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: this.props.data.address,
            rules: [
              {
                required: true,
                message: '街道地址不能为空！'
              }
            ]
          })(
            <Input placeholder="请输入街道地址" />
          )}
        </FormItem>
        <FormItem label="邮编" {...formItemLayout}>
          {getFieldDecorator('postCode', {
            initialValue: this.props.data.postCode
          })(<Input placeholder="请输入邮编" />)}
        </FormItem>
        <FormItem label="手机" {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: this.props.data.phone,
            rules: [
              {
                required: true,
                message: '手机号不能为空！'
              }
            ]
          })(<Input placeholder="请输入手机号" />)}
        </FormItem>
        <FormItem label="电话" {...formItemLayout}>
          {getFieldDecorator('tel', {
            initialValue: this.props.data.tel
          })(<Input placeholder="请输入电话号码" />)}
        </FormItem>
        <FormItem {...formItemLayoutLast}>
          <Checkbox checked={this.props.data.default} onChange={this.props.data.onChange}>设置为默认发货地址</Checkbox>
        </FormItem>
      </Form>
    </Modal>);
  }
}

export default Form.create()(SenderEdit);
