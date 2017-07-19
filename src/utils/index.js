import crypto from 'crypto-browserify';

// 使用随机值加盐，MD5加密
export function cryptPwd(password) {
//   const salt = Math.random().toString().slice(2, 5);
  // 密码“加盐”
//   const saltPassword = password + ':' + salt;
  const saltPassword = password;
  // 加盐密码的md5值
  const md5 = crypto.createHash('md5');
  const result = md5.update(saltPassword).digest('hex');
  return result;
}
// 获取url参数
export function getUrlPara(key) {
  const queryStr = window.location.search.slice(1);
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`, 'i');
  const matchRes = queryStr.match(reg);
  if (matchRes && matchRes[2]) {
    return decodeURIComponent(matchRes[2]);
  } else {
    return '';
  }
}
