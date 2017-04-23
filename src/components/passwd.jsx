import React from 'react';

class Passwd extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return <p>修改密码</p>;
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default Passwd;
