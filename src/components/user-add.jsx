import React from 'react';
import { Modal, Button, Input, Select, Form } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
class UserAdd extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }
  handleOk() {
    this.props.data.handleOk();
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const { getFieldDecorator } = this.props.form;
    return (<Modal
      visible
      style={{ top: '50%', marginTop: '-289px' }}
      title={this.props.data.title}
      onOk={this.handleOk.bind(this)}
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
          onClick={this.handleOk.bind(this)}
        >
          确定
        </Button>
      ]}
    >
      <Form layout="vertical">
        <FormItem label="用户名" {...formItemLayout}>
          {getFieldDecorator('userName', {
            initialValue: this.props.userName
          })(
            <Input placeholder="请输入用户名" disabled={this.props.data.disableUsername} />
          )}
        </FormItem>
        <FormItem label="密码" {...formItemLayout}>
          {getFieldDecorator('userName', {
            initialValue: this.props.userName
          })(
            <Input placeholder="请输入密码" disabled={this.props.data.disableUsername} />
          )}
        </FormItem>
        <FormItem label="选择库位" {...formItemLayout}>
          {getFieldDecorator('wareHouse', {
            initialValue: '广东省广州市科技路一号百库1号仓'
          })(
            <Select>
              <Option key="1" value="广东省广州市科技路一号百库1号仓">
                广东省广州市科技路一号百库1号仓
              </Option>
              <Option key="2" value="四川省绵阳市绵兴东路一号百库11号仓">
                四川省绵阳市绵兴东路一号百库11号仓
              </Option>
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>);
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default Form.create()(UserAdd);
