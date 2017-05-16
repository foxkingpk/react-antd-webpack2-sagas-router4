import React from 'react';
import API from 'API';
import { message } from 'antd';
import SenderItem from './sender-item';
import SenderNew from './sender-new';
import SenderEdit from './sender-edit';

class SenderSetting extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      datas: [],
      modalData: {
        visible: true,
        title: '新增联系人',
        handleOk: () => {
          API.addSenderResource().then((res) => {
            message.success('增加联系人成功！');
            this.hideDialog();
            this.getData();
          });
        },
        handleCancel: () => {
          this.hideDialog();
        }
      }
    };
  }

  hideDialog() {
    this.setState({
      ...this.state,
      modalData: {
        ...this.state.modalData,
        visible: false
      },
      showModal: false
    });
  }
  getData() {
    API.getSendersResource().then((res) => {
      
      this.setState({
        datas: res.data.data.list
      });
    });
  }
  componentDidMount() {
    this.getData();
  }
  newSenderDlg() {
    this.setState({
      ...this.state,
      modalData: {
        ...this.state.modalData,
        visible: true
      },
      showModal: true
    });
  }
  editSenderDlg(item) {
    console.log(item);
    this.setState({
      ...this.state,
      modalData: {
        ...this.state.modalData,
        visible: true,
        title: '编辑联系人',
        name: item.name,
        address: item.address,
        region: item.region,
        company: item.company,
        postCode: item.postCode,
        phone: item.phone,
        tel: item.tel
      },
      showModal: true
    });
  }
  render() {
    const listItems = this.state.datas.map((item, index) =>
      <li style={{ float: 'left', margin: '10px' }} key={index}>
        <SenderItem props={item} editSenderDlg={this.editSenderDlg.bind(this, item)} />
      </li>
    );

    return <div>
        <ul className="clearfix">
         {listItems}
         
         <li style={{ float: 'left', margin: '10px' }} key="senderNew">
           <SenderNew newSenderDlg={this.newSenderDlg.bind(this)} />
         </li>
        </ul>
      { this.state.showModal ? <SenderEdit data={this.state.modalData} /> : '' }
      </div>;
  }

  
}

export default SenderSetting;
