import React from 'react';
import App from './app';
import { Route, Switch } from 'react-router-dom';
import OrderUnassign from '../components/order-unassign.jsx';
import OrderAssigned from '../components/order-assigned.jsx';
import OrdersBack from '../components/orders-back.jsx';
import UnReturnVisitOrders from '../components/unreturn-visit-orders.jsx';
import ReturnVisitOrders from '../components/return-visit-orders.jsx';
import NoMatch from './nomatch';

const Orders = () => {
  return (<div>
    <App>
      <Switch>
        <Route exact path="/orders/OrderUnassign" component={OrderUnassign} />
        <Route exact path="/orders/OrderAssigned" component={OrderAssigned} />
        <Route exact path="/orders/OrdersBack" component={OrdersBack} />
        <Route exact path="/orders/UnReturnVisitOrders" component={UnReturnVisitOrders} />
        <Route exact path="/orders/ReturnVisitOrders" component={ReturnVisitOrders} />
        <Route component={NoMatch} />
      </Switch>
    </App>
  </div>);
};

export default Orders;
