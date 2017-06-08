import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from 'CONTAINERS/Dashboard';
import Orders from 'CONTAINERS/orders';
import UserManger from 'CONTAINERS/usermanager';
import Express from 'CONTAINERS/express';
import Print from 'CONTAINERS/print';
import Login from 'COMPONENTS/login';
import NoMatch from 'CONTAINERS/nomatch';
import store from 'REDUX/store/';
import { init } from 'UTILS/init.js';

init(store);

ReactDOM.render(
  <Provider store={store}>
    {/*<BrowserRouter basename="/test">*/}
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Dashboard} />
          <Route path="/orders" component={Orders} />
          <Route path="/user" component={UserManger} />
          <Route path="/express" component={Express} />
          <Route path="/print" component={Print} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
    document.getElementById('box')
);
