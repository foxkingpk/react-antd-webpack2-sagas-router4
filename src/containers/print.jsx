import React from 'react';
import App from './app';
import { Route, Switch } from 'react-router-dom';
import PrinterManager from '../components/printer-manager.jsx';
import SenderSetting from '../components/sender-setting.jsx';
import NoMatch from './nomatch';

const Print = () => {
  return (<div>
    <App>
      <Switch>
        <Route exact path="/print/senderSetting" component={SenderSetting} />
        <Route exact path="/print/printerManager" component={PrinterManager} />
        <Route component={NoMatch} />
      </Switch>
    </App>
  </div>);
};

export default Print;
