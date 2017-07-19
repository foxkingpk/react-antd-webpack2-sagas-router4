import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './containers/dashboard';
import Orders from './containers/orders';
import UserManger from './containers/usermanager';
import Express from './containers/express';
import Print from './containers/print';
import Login from './components/login';
import NoMatch from './containers/nomatch';
import store from './redux/store/';
import { init } from './utils/init.js';
import ScrollToTop from './containers/scroll-to-top';
init(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
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
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
    document.getElementById('box')
);
