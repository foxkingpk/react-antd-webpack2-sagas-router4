import React from 'react';
import App from './app';
import { Route, Switch } from 'react-router-dom';
import NewUser from '../components/user-add.jsx';
import UserList from '../components/userlist.jsx';
import NoMatch from './nomatch';

const UserManager = () => {
  return (<div>
    <App>
      <Switch>
        <Route exact path="/user/newUser" component={NewUser} />
        <Route exact path="/user/userList" component={UserList} />
        <Route component={NoMatch} />
      </Switch>
    </App>
  </div>);
};

export default UserManager;
