import React from 'react';

class NewProgram extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return <div>
        <h3>新建节目</h3>
    </div>;
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default NewProgram;
