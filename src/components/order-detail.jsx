import React from 'react';
import PropTypes from 'prop-types';
import API from '../api/index';
import { connect } from 'react-redux';
import { Tabs, Row, Col, Input, Table, Button, Form, Cascader, Select } from 'antd';
import '../assets/less/order-detail.less';
import { toggleOrderDetail } from '../redux/actions/user';
import city from '../utils/city';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const columns = [{
  title: '编号',
  key: 'id',
  dataIndex: 'id'
}, {
  title: '宝贝名称',
  key: 'goodsName',
  dataIndex: 'goodsName'
}, {
  title: '订单编号',
  key: 'orderID',
  dataIndex: 'orderID'
}, {
  title: '买家昵称',
  key: 'nickname',
  dataIndex: 'nickname'
}, {
  title: '收件人',
  key: 'reciver',
  dataIndex: 'reciver'
}, {
  title: '手机号',
  key: 'phone',
  dataIndex: 'phone'
}, {
  title: '发货时间',
  key: 'sendTime',
  dataIndex: 'sendTime'
}, {
  title: '街道地址',
  key: 'address',
  dataIndex: 'address'
}, {
  title: '快递',
  key: 'express',
  dataIndex: 'express',
  width: 100,
  fixed: 'right'
}];

class OrderDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      senderList: []
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    API.getSendersResource().then((res) => {
      if (res.data.code === 200) {
        const rList = res.data.data.list;
        this.setState({
          senderList: rList
        });
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.saveOrderDetail(this.props.form.getFieldsValue());
  }
  toggleOrderDetail() {
    this.props.toggleOrderDetail();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (<div className="card-container" style={{ position: 'relative', minHeight: 15 }}>
      <div style={{ position: 'absolute', right: 0, top: 0, zIndex: 10, cursor: 'pointer' }} onClick={this.toggleOrderDetail.bind(this)}>
        <Button type="primary">{this.props.showOrderDetail ? '隐藏订单详情' : '显示订单详情'}</Button>
      </div>
      <div className={this.props.showOrderDetail ? 'show' : 'hide'}>
        <Form>
          <Tabs type="card">
            <TabPane tab="基本信息" key="1">
              <div className="basic">
                <Row>
                  <Col className="item" span={8}>
                    <div className="item-detail">
                      <div className="title">买家留言</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('buyerMsg', {
                            initialValue: this.props.buyerMsg
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">卖家备注</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('sellerMsg', {
                            initialValue: this.props.sellerMsg
                          })(
                            <textarea className="sellerMsg" rows="3" cols="20" disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </Col>
                  <Col className="item" span={8}>
                    <div className="item-detail">
                      <div className="title">买家昵称</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('buyerNickName', {
                            initialValue: this.props.buyerNickName
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">支付宝</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('buyerAliPay', {
                            initialValue: this.props.buyerAliPay
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">电子邮件</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('buyerEmail', {
                            initialValue: this.props.buyerEmail
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </Col>
                  <Col className="item" span={8}>
                    <div className="item-detail">
                      <div className="title">订单编号</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('orderNum', {
                            initialValue: this.props.orderNum
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">成交时间</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('tradeTime', {
                            initialValue: this.props.tradeTime
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">支付宝交易号</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('tradeNum', {
                            initialValue: this.props.tradeNum
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div style={{ marginTop: 20, height: 194 }}>
                  <Table
                    bordered
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={this.state.data}
                    scroll={{ x: 1500, y: 160 }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="快递信息" key="2">
              <div className="express">
                <Row>
                  <Col className="item" span={12}>
                    <div className="item-detail">
                      <div className="title">快递</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('express', {
                            initialValue: this.props.express
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">运单号</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('expressnumbers', {
                            initialValue: this.props.expressnumbers
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">发货人</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('sender', {
                            initialValue: this.props.sender
                          })(
                            <Select disabled={this.props.disableEdit} >
                              {this.state.senderList.map(item => (
                                <Option key={item.id} value={item.sendName}>
                                  {item.sendName}
                                </Option>)
                              )}
                            </Select>
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </Col>
                  <Col className="item" span={12}>
                    <div className="item-detail">
                      <div className="title">收货人</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('receiver', {
                            initialValue: this.props.receiver
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">所在地</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('city', {
                            initialValue: this.props.city
                          })(
                            <Cascader
                              size="large"
                              style={{ width: '100%' }}
                              options={city}
                              placeholder="请选择地址"
                              disabled={this.props.disableEdit}
                            />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">街道地址</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('address', {
                            initialValue: this.props.address
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">单位</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('company', {
                            initialValue: this.props.company
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">邮编</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('zipcode', {
                            initialValue: this.props.zipcode
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">手机</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('phone', {
                            initialValue: this.props.phone
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">电话</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('tel', {
                            initialValue: this.props.tel
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    <div className="item-detail">
                      <div className="title">发票</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('invoice', {
                            initialValue: this.props.invoice
                          })(
                            <Input disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            { this.props.isAdmin ? <TabPane tab="回访信息" key="3">
              <div className="express">
                <Row>
                  <Col className="item" span={24}>
                    <div className="item-detail">
                      <div className="title">回访备注</div>
                      <div className="content">
                        <FormItem>
                          {getFieldDecorator('returnVisitMsg', {
                            initialValue: this.props.returnVisitMsg
                          })(
                            <textarea className="sellerMsg" rows="3" cols="20" disabled={this.props.disableEdit} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane> : ''}
          </Tabs>
        </Form>
        <div className="clearfix" style={{ paddingTop: 10 }}>
          <Button type="primary" disabled={this.props.disableEdit} style={{ float: 'right' }} onClick={this.handleSubmit.bind(this)}>保存</Button>
        </div>
      </div>
    </div>);
  }
}
OrderDetail.propTypes = {
  sellerMsg: PropTypes.string.isRequired,
  buyerNickName: PropTypes.string.isRequired,
  buyerAliPay: PropTypes.string.isRequired,
  buyerEmail: PropTypes.string.isRequired,
  orderNum: PropTypes.number,
  tradeTime: PropTypes.string,
  tradeNum: PropTypes.number,
  express: PropTypes.string.isRequired,
  expressnumbers: PropTypes.number,
  receiver: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  city: PropTypes.array.isRequired,
  address: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  phone: PropTypes.number,
  tel: PropTypes.string.isRequired,
  zipcode: PropTypes.number,
  invoice: PropTypes.string.isRequired,
  disableEdit: PropTypes.bool.isRequired
};
OrderDetail.defaultProps = {
  sellerMsg: '',
  buyerNickName: '',
  buyerAliPay: '',
  buyerEmail: '',
  orderNum: null,
  tradeTime: null,
  tradeNum: null,
  express: '',
  expressnumbers: null,
  receiver: '',
  sender: '',
  city: [],
  address: '',
  company: '',
  phone: null,
  tel: '',
  zipcode: null,
  invoice: '',
  disableEdit: false
};
function mapStateToProp(state) {
  return {
    showOrderDetail: state.userReducer.showOrderDetail,
    isAdmin: state.userReducer.isAdmin
  };
}
function mapDispatchToProp(dispatch) {
  return {
    toggleOrderDetail: () => {
      dispatch(toggleOrderDetail());
    }
  };
}
export default connect(mapStateToProp, mapDispatchToProp)(Form.create()(OrderDetail));
