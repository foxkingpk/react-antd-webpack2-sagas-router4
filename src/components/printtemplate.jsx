import React from 'react';

class PrintTemplate extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return <div>
        <h3>发布节目</h3>
      </div>;
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default PrintTemplate;
