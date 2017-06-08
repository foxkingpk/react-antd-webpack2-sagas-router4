import React from 'react';
import { Modal, Form, Button, Input, Checkbox, Cascader } from 'antd';
import city from 'UTILS/city';
import 'ASSETS/less/dialog.less';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
class SenderEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.form.validateFields((err) => {
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
      visible
      style={{ top: '50%', marginTop: '-290px' }}
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
          key="submit"
          type="primary"
          size="large"
          loading={this.props.data.confirmLoading}
          onClick={this.handleSubmit}
        >
          确定
        </Button>
      ]}
    >
      <Form layout="horizontal">
        <FormItem label="联系人" {...formItemLayout}>
          {getFieldDecorator('sendName', {
            initialValue: this.props.data.sendName,
            rules: [
              {
                required: true,
                message: '联系人不能为空！'
              }
            ]
          })(<Input placeholder="请输入联系人" />)}
        </FormItem>
        <FormItem label="所在地" {...formItemLayout}>
          {getFieldDecorator('sendcity', {
            initialValue: this.props.data.sendcity,
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
          {getFieldDecorator('sendaddr', {
            initialValue: this.props.data.sendaddr,
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
        <FormItem label="公司" {...formItemLayout}>
          {getFieldDecorator('sendcompany', {
            initialValue: this.props.data.sendcompany
          })(<Input placeholder="请输入公司名称" />)}
        </FormItem>
        <FormItem label="邮编" {...formItemLayout}>
          {getFieldDecorator('sendzipcode', {
            initialValue: this.props.data.sendzipcode
          })(<Input placeholder="请输入邮编" />)}
        </FormItem>
        <FormItem label="手机" {...formItemLayout}>
          {getFieldDecorator('sendmobile', {
            initialValue: this.props.data.sendmobile,
            rules: [
              {
                required: true,
                message: '手机号不能为空！'
              }
            ]
          })(<Input placeholder="请输入手机号" />)}
        </FormItem>
        <FormItem label="电话" {...formItemLayout}>
          {getFieldDecorator('sendtel', {
            initialValue: this.props.data.sendtel
          })(<Input placeholder="请输入电话号码" />)}
        </FormItem>
        <FormItem {...formItemLayoutLast}>
          <Checkbox checked={this.props.data.default} onChange={this.props.data.onChange}>设置为默认发货地址</Checkbox>
        </FormItem>
        <FormItem style={{ display: 'none' }}>
          {getFieldDecorator('id', {
            initialValue: this.props.data.id
          })(<Input type="hidden" />)}
        </FormItem>
      </Form>
    </Modal>);
  }
}

SenderEdit.propTypes = {
  data: PropTypes.object.isRequired
};

export default Form.create()(SenderEdit);
