import Mock from 'mockjs';

const data = {
  'data|10': [
    {
      'name|3': '@cname',
      'sex|1': ['男', '女'],
      'age|11-99': 1
    }
  ]
};
const data1 = {
  'data|5': [{
    'name|2': 'abc',
    'age|20-100': 1,
    'sex|1': ['mail', 'femail']
  }]
};
const login = {
  token: "1234567890"
};
const logout = {
  data: "success"
};
const asynData = {
  'data': '@email'
};
// console.log('mockjs...');
// Mock.mock(/1\.txt$/, data);
// Mock.mock(/2\.txt$/, data1);
// Mock.mock(/login$/, login);
// Mock.mock(/logout$/, logout);
// // Mock.mock(/data.json$/, asynData);
// Mock.setup({ timeout: '200-600' });
