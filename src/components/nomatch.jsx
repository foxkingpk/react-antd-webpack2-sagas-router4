import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import 'ASSETS/less/nomatch.less';

class Nomatch extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (<div className="nomatch">
      <section>
        <h1>404</h1>
        <p>
          <Link to="/">返回首页</Link>
        </p>
      </section>
    </div>);
  }
}

export default withRouter(Nomatch);
