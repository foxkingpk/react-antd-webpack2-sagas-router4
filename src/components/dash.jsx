import React from 'react';
import axios from 'axios';
import { Table } from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  width: '20%',
  sorter: true
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '性别',
  dataIndex: 'sex'
}];
class Dash extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      pagination: { total: 20 },
      data: [],
      loading: false
    };
  }
  componentDidMount() {
    this.request(1);
  }
  request(pageNumber) {
    axios.get(`http://localhost:9210/data${pageNumber}.txt`).then((response) => {
      const { status } = response;
      console.log(response);
      return {
        status,
        data: response.data
      };
    }).then((data) => {
      console.log(data);
      this.setState({
        data: data.data.data
      });
    });
  }
  handleTableChange(pagination) {
    console.log(`handleTableChange:${this.state}`);
    this.request(pagination.current);
  }
  render() {
    return <div>
        <Table
            columns={columns}
            rowKey={record => record.registered}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
         />
    </div>;
  }
}

export default Dash;
