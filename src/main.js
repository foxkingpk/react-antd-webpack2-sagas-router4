import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from 'COMPONENT/app';
import Login from 'COMPONENT/login.jsx';
import store from 'REDUX/store/';
import { init } from 'UTILS/init.js';

init(store);

ReactDOM.render(
  <Provider store={store}>
    {/*<BrowserRouter basename="/test">*/}
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/" render={(props) => {
              return store.getState().userReducer.authenticated ? <App /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
            }
          }
          />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
    document.getElementById('box')
);
