import React from 'react';
import { Modal, Form, Button, Input, Checkbox } from 'antd';

const FormItem = Form.Item;
class SenderEdit extends React.Component {
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
    }
    return (<Modal
      visible={this.props.data.visible}
      title={this.props.data.title}
      style={{ top: '50%', transform: 'translateY(-50%)' }}
      onOk={this.props.data.handleOk}
      onCancel={this.props.data.handleCancel}
      layout="horizontal"
      footer={[
        <Button
          key="back" size="large" onClick={this.props.data.handleCancel}
        >
        取消
        </Button>,
        <Button
          key="submit" type="primary" size="large"
          onClick={this.props.data.handleOk}
        >
          确定
        </Button>
      ]}
      >
      <Form layout="horizontal">
        <FormItem label="联系人" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: this.props.data.name,
            rules: [
              {
                required: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label="所在地" hasFeedback {...formItemLayout}>
          {getFieldDecorator('region', {
            initialValue: this.props.data.region,
            rules: [
              {
                required: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label="街道地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: this.props.data.address,
            rules: [
              {
                required: true,
                type: 'boolean'
              }
            ]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="邮编" hasFeedback {...formItemLayout}>
          {getFieldDecorator('postCode', {
            initialValue: this.props.data.postCode,
            rules: [
              {
                required: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label="手机" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: this.props.data.phone,
            rules: [
              {
                required: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label="电话" hasFeedback {...formItemLayout}>
          {getFieldDecorator('tel', {
            initialValue: this.props.data.tel,
            rules: [
              {
                required: true
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayoutLast}>
          {getFieldDecorator('defaultAddress', {
            initialValue: this.props.data.defaultAddress,
            rules: []
          })(<Checkbox>设置为默认发货地址</Checkbox>)}
        </FormItem>
      </Form>
    </Modal>);
  }
}

export default Form.create()(SenderEdit);
