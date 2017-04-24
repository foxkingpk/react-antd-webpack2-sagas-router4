import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from 'COMPONENT/app.jsx';
import Login from 'COMPONENT/login.jsx';
import reducers from 'REDUX/reducers';
import saga from 'REDUX/sagas';

const isLogin = () => {
  const loginCookie = document.cookie.match(/XID=([^;]\w*)/);
  if (loginCookie && loginCookie[1]) {
    return true;
  }
  return false;
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, compose(applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/" render={(props) => {
              return isLogin() ? <App /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
            }
          }
          />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
    document.getElementById('box')
);
