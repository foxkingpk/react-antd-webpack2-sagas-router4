import React from 'react';
import App from 'CONTAINERS/app';
import { Route, Switch } from 'react-router-dom';
import OrderList from 'COMPONENTS/orderlist';
import OrderListBack from 'COMPONENTS/orderlist-back';
import OrderListNew from 'COMPONENTS/orderlist-new';
import OrderListFinish from 'COMPONENTS/orderlist-finish';
import MsgOrderList from 'COMPONENTS/orderlist-msg';
import NoMsgOrderList from 'COMPONENTS/orderlist-nomsg';
import NoMatch from 'CONTAINERS/nomatch';

const Express = () => {
  return (<div>
    <App>
      <Switch>
        <Route exact path="/express/orderList" component={OrderList} />
        <Route exact path="/express/orderListNew/msgOrderList" component={MsgOrderList} />
        <Route exact path="/express/orderListNew/noMsgOrderList" component={NoMsgOrderList} />
        <Route exact path="/express/orderListBack" component={OrderListBack} />
        <Route exact path="/express/orderListNew" component={OrderListNew} />
        <Route exact path="/express/orderListFinish" component={OrderListFinish} />
        <Route component={NoMatch} />
      </Switch>
    </App>
  </div>);
};

export default Express;
