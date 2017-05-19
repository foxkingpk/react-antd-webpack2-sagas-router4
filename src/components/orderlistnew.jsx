import React from 'react';
import API from 'API';
import { Table, Icon, Row, Col, Input, Select, message, notification, Modal } from 'antd';
import 'ASSETS/less/orderlistnew.less';
import mLODOP from 'UTILS/print.js';

const Search = Input.Search;
const Option = Select.Option;
const confirm = Modal.confirm;

const columns = [{
  title: '编号',
  key: 'id',
  dataIndex: 'id',
  width: 50,
  fixed: 'left'
}, {
  title: '宝贝名称',
  key: 'goodsName',
  dataIndex: 'goodsName',
  width: 200,
  fixed: 'left'
}, {
  title: '订单编号',
  key: 'orderID',
  dataIndex: 'orderID'
}, {
  title: '买家昵称',
  key: 'nickname',
  dataIndex: 'nickname'
}, {
  title: '订单时间',
  key: 'time',
  dataIndex: 'time'
}, {
  title: '街道地址',
  key: 'address',
  dataIndex: 'address'
}, {
  title: '快递公司',
  key: 'express',
  dataIndex: 'express'
}, {
  title: '快递单打印状态',
  key: 'printed',
  dataIndex: 'printed',
  width: 100,
  fixed: 'right'
}, {
  title: '操作',
  key: 'opt',
  dataIndex: 'opt',
  width: 100,
  fixed: 'right',
  render: (text, record) => (<div><a href="javascript:;" onClick={() => {
    if (!mLODOP.getMLodop()) {
      notification.error({
        message: '错误提示',
        description: '你还没安装打印插件，或者没有运行打印程序。请到打印机管理页面进行下载、安装、测试！',
        duration: 5
      });
    } else {
      const tempLodop = mLODOP.getMLodop();
      
      Promise.all([API.getDefaultPrinter(), API.getOrderPrintDataResource(), API.getExpressTemplateResource()]).then((values) => {
        console.log(values);
        const defaultPrinter = values[0].data.data.printer;
        const printData = values[1].data.data;
        const tempdata = values[2].data.data;
        mLODOP.printPurge(defaultPrinter);
        mLODOP.printResume(defaultPrinter);
        const rTemplate = kdPrintBase.printContentReplace(tempdata.note, printData, tempdata);
        eval(rTemplate);
        if (!mLODOP.checkPrinter(defaultPrinter)) {
          notification.error({
            message: '错误提示',
            description: '当前设置的默认打印机没有找到，请前往"打印设置"页面，重新设置默认打印机！'
          });
          return;
        }
	   
        tempLodop.SET_PRINT_PAGESIZE(1, parseFloat(tempdata.width) * 10, parseFloat(tempdata.height) * 10, "");
        tempLodop.SET_SHOW_MODE('HIDE_PAPER_BOARD', true);
        tempLodop.SET_PREVIEW_WINDOW(2, 1, 1, 700, 440, '快递单打印');
        tempLodop.SET_SHOW_MODE('PREVIEW_IN_BROWSE', true);
        tempLodop.SET_PRINTER_INDEX(defaultPrinter);
        tempLodop.SET_PRINT_MODE('AUTO_CLOSE_PREWINDOW', 1);
        mLODOP.preview();
      }).catch((reason) => {
        console.log(reason);
      });
    }
  }}>
    <Icon type="printer" style={{ marginRight: 2 }} />打印
  </a><a style={{ marginLeft: 5 }} href="javascript:;" onClick={(record, e) => {
    confirm({
      title: '您确定将该订单退回?',
      onOk() {
        onBackOrderItem(record.id);
      }
    });
  }}><Icon type="rollback" style={{ marginRight: 2 }} />退回</a></div>)
}];
const onBackOrderItem = (id) => {
  API.updateOrderVendorResource({ id }).then((res) => {
      console.log(res);
  });
}
class OrderListNew extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      pagination: { total: 100, showSizeChanger: true, showQuickJumper: true },
      data: [],
      loading: false
    };
  }
  componentDidMount() {
    this.request();
  }  
  request(payload) {
    this.setState({
      loading: true
    });

    API.getOrderListNewResource(payload).then((res) => {
      console.log(res);
      this.setState({
        data: res.data.data,
        loading: false
      });
    });
  }
  handleTableChange(pagination) {
    console.log('handleTableChange:', pagination);
    this.request({
      page: pagination.current,
      pageSize: pagination.pageSize
    });
  }
  onChange(value) {
    console.log("onchange",value);
  }
  render() {
    return <div className="orderListnew">
      <Row style={{ marginBottom: 12 }}>
        <Col xs={12} sm={8} style={{ marginRight: 12 }}>
          <Search placeholder="请输入查询的收件人" onSearch={value => console.log(value)} />
        </Col>
        <Col xs={8} sm={8} lg={4} style={{ margin: '0 12px' }}>
          <Select className="orderPrint" placeholder="请选择订单打印状态" allowClear onChange={this.onChange.bind(this)}>
            <Option value="wait">未打印</Option>
            <Option value="finish">已打印</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} lg={8}>  
        </Col>
      </Row>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange.bind(this)}
        scroll={{ x: 1500 }}
      />
    </div>;
  }
}

export default OrderListNew;
