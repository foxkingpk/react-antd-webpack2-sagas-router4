import { API_ROOT } from './config.js';

const apiWX = {
  Login: '/api/login',
  Logout: '/api/logout',
  Orders: '/api/orders',
  OrderListNew: '/api/orderListNew',
  OrderListFinish: '/api/orderListFinish',
  OrderState: '/api/orderstate',
  Senders: '/api/senders',
  AddSender: '/api/addSender',
  ChangeDefaultPrinter: '/api/changeDefaultPrinter',
  GetDefaultPrinter: '/api/getDefaultPrinter',
  GetOrderPrintData: '/api/getOrderPrintData',
  GetExpressTemplate: '/api/getExpressTemplate'
};

const LoginResource = API_ROOT.concat(apiWX.Login);
const LogoutResource = API_ROOT.concat(apiWX.Logout);
const OrderStateResource = API_ROOT.concat(apiWX.OrderState);
const OrderListNewResource = API_ROOT.concat(apiWX.OrderListNew);
const OrderListFinishResource = API_ROOT.concat(apiWX.OrderListFinish);
const SendersResource = API_ROOT.concat(apiWX.Senders);
const AddSenderResource = API_ROOT.concat(apiWX.AddSender);
const ChangeDefaultPrinterResource = API_ROOT.concat(apiWX.ChangeDefaultPrinter);
const GetDefaultPrinterResource = API_ROOT.concat(apiWX.GetDefaultPrinter);
const GetOrderPrintDataResource = API_ROOT.concat(apiWX.GetOrderPrintData);
const GetExpressTemplateResource = API_ROOT.concat(apiWX.GetExpressTemplate);

export {
  LoginResource,
  LogoutResource,
  OrderListNewResource,
  OrderListFinishResource,
  OrderStateResource,
  SendersResource,
  AddSenderResource,
  ChangeDefaultPrinterResource,
  GetDefaultPrinterResource,
  GetOrderPrintDataResource,
  GetExpressTemplateResource
};
