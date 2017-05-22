import React from 'react';
import API from 'API';
import { message, Modal } from 'antd';
import SenderItem from './sender-item';
import SenderNew from './sender-new';
import SenderEdit from './sender-edit';

const confirm = Modal.confirm;
class SenderSetting extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      isNewDlg: false,
      datas: [],
      modalData: {
        title: '新增联系人',
        name: '',
        address: '',
        region: [],
        company: '',
        postCode: '',
        phone: '',
        tel: '',
        default: false,
        confirmLoading: false,
        handleOk: (payload) => {
          this.setState({
            ...this.state,
            modalData: {
              ...this.state.modalData,
              confirmLoading: true
            }
          });

          API.addSenderResource(payload).then((res) => {
            message.success(this.state.isNewDlg ? '新增联系人成功！' : '修改联系人成功！');
            this.setState({
              ...this.state,
              modalData: {
                ...this.state.modalData,
                confirmLoading: false
              }
            });
            this.hideDialog();
            this.getData();
          });
        },
        handleCancel: () => {
          this.hideDialog();
        },
        onChange: (e) => {
          this.setState({
            ...this.state,
            modalData: {
              ...this.state.modalData,
              default: e.target.checked
            }
          });
        }
      }
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    API.getSendersResource().then((res) => {
      this.setState({
        datas: res.data.data.list
      });
    });
  }
  hideDialog() {
    this.setState({
      ...this.state,
      showModal: false
    });
  }
  newSenderDlg() {
    this.setState({
      ...this.state,
      modalData: {
        ...this.state.modalData,
        title: '新增联系人',
        sendName: '',
        sendaddr: '',
        sendcity: [],
        sendcompany: '',
        sendzipcode: '',
        sendmobile: '',
        sendtel: '',
        default: false
      },
      showModal: true,
      isNewDlg: true
    });
  }
  editSenderDlg(item) {
    this.setState({
      ...this.state,
      modalData: {
        ...this.state.modalData,
        visible: true,
        title: '编辑联系人',
        sendName: item.sendName,
        sendaddr: item.sendaddr,
        sendcity: item.sendcity,
        sendcompany: item.sendcompany,
        sendzipcode: item.sendzipcode,
        sendmobile: item.sendmobile,
        sendtel: item.sendtel,
        default: item.default
      },
      showModal: true,
      isNewDlg: false
    });
  }
  delDlg(item) {
    confirm({
      title: '您确定将删除该寄件人信息?',
      onOk: () => {
        API.delSenderResource({ id: item.id }).then((res) => {
          message.success('删除寄件人信息操作成功！');
          this.getData();
        });
      }
    });

  }
  render() {
    const listItems = this.state.datas.map((item, index) =>
      <li style={{ float: 'left', margin: '10px' }} key={index}>
        <SenderItem props={item} editSenderDlg={this.editSenderDlg.bind(this, item)} delDlg={this.delDlg.bind(this, item)} />
      </li>
    );

    return (<div>
      <ul className="clearfix">
        {listItems}
        <li style={{ float: 'left', margin: '10px' }} key="senderNew">
          <SenderNew newSenderDlg={this.newSenderDlg.bind(this)} />
        </li>
      </ul>
      { this.state.showModal ? <SenderEdit data={this.state.modalData} /> : '' }
    </div>);
  }
}

export default SenderSetting;
