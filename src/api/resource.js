import { API_ROOT } from './config.js';

const apiWX = {
  Login: '/api/login',
  Logout: '/api/logout',
  Orders: '/api/orders',
  OrderState: '/api/orderstate'
};

const LoginResource = API_ROOT.concat(apiWX.Login);
const LogoutResource = API_ROOT.concat(apiWX.Logout);
const OrdersResource = API_ROOT.concat(apiWX.Orders);
const OrderStateResource = API_ROOT.concat(apiWX.OrderState);

export {
  LoginResource,
  LogoutResource,
  OrdersResource,
  OrderStateResource
};
