import React from 'react';
import App from 'CONTAINERS/app';
import { Route, Switch } from 'react-router-dom';
import OrderListNew from 'COMPONENTS/orderlistnew.jsx';
import OrderListFinish from 'COMPONENTS/orderlistfinish.jsx';
import NoMatch from 'CONTAINERS/nomatch';

const Express = () => {
  return (<div>
    <App>
      <Switch>
        <Route exact path="/express/orderListNew" component={OrderListNew} />
        <Route exact path="/express/orderListFinish" component={OrderListFinish} />
        <Route component={NoMatch} />
      </Switch>
    </App>
  </div>);
};

export default Express;
