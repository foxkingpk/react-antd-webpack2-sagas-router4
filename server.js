const path = require('path');
const express = require('express');

const app = express();
const port = 3000;
const authentication = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
};
app.all('*', authentication);
app.get('/api/orderstate', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*');
  res.sendStatus(401);
  //res.status(200).json({data: 'Valid JWT found! This protected data was fetched from the server.'});
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
