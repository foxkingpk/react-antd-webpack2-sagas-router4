import React from 'react';
import App from 'CONTAINERS/app';
import { Route, Switch } from 'react-router-dom';
import OrderUnassign from 'COMPONENTS/order-unassign.jsx';
import OrderAssigned from 'COMPONENTS/order-assigned.jsx';
import OrdersBack from 'COMPONENTS/orders-back.jsx';
import UnReturnVisitOrders from 'COMPONENTS/unreturn-visit-orders.jsx';
import ReturnVisitOrders from 'COMPONENTS/return-visit-orders.jsx';
import NoMatch from 'CONTAINERS/nomatch';

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
