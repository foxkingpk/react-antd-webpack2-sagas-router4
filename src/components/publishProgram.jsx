import React from 'react';

class PublishProgram extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return <p>
        <h3>发布节目</h3>
    </p>;
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default PublishProgram;
