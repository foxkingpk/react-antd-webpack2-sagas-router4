import React from 'react';
import App from './app';
import { Route, Switch } from 'react-router-dom';
// import OrderList from '../components/orderlist';
// import OrderListBack from '../components/orderlist-back';
// import OrderListNew from '../components/orderlist-new';
// import OrderListFinish from '../components/orderlist-finish';
// import MsgOrderList from '../components/orderlist-msg';
// import NoMsgOrderList from '../components/orderlist-nomsg';
import NoMatch from './nomatch';

import Loadable from '../components/loading';

const OrderList = Loadable({
  loader: () => import('../components/orderlist')
});
const OrderListBack = Loadable({
  loader: () => import('../components/orderlist-back')
});
const OrderListFinish = Loadable({
  loader: () => import('../components/orderlist-finish')
});
const MsgOrderList = Loadable({
  loader: () => import('../components/orderlist-msg')
});
const NoMsgOrderList = Loadable({
  loader: () => import('../components/orderlist-nomsg')
});
const OrderListNew = Loadable({
  loader: () => import('../components/orderlist-new')
});



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
