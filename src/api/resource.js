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
  GetExpressTemplate: '/api/getExpressTemplate',
  UpdateOrderVendor: '/api/updateOrderVendor',
  GetUnassignOrders: '/api/getUnassignOrders',
  GetAssignedOrders: '/api/getAssignedOrders',
  GetOrderVendors: '/api/getOrderVendors',
  SaveUnassignOrder: '/api/saveUnassignOrder',
  DefaultSender: '/api/defaultSender',
  DelSender: '/api/delSender',
  UpdateSender: '/api/updateSender',
  GetBackOrders: '/api/orderListBack',
  UpdateOrdersExpressStatus: '/api/updateOrdersExpressStatus',
  GetOrderDetail: '/api/orderDetail',
  GetAllOrders: '/api/orderList',
  GetPrintOrderList: '/api/printOrderList',
  GetPrintOption: '/api/printOption',
  SavePrintOption: '/api/savePrintOption'
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
const UpdateOrderVendorResource = API_ROOT.concat(apiWX.UpdateOrderVendor);
const GetUnassignOrdersResource = API_ROOT.concat(apiWX.GetUnassignOrders);
const GetAssignedOrdersResource = API_ROOT.concat(apiWX.GetAssignedOrders);
const GetOrderVendorsResource = API_ROOT.concat(apiWX.GetOrderVendors);
const SaveUnassignOrderResource = API_ROOT.concat(apiWX.SaveUnassignOrder);
const GetDefaultSenderResource = API_ROOT.concat(apiWX.DefaultSender);
const DelSenderResource = API_ROOT.concat(apiWX.DelSender);
const UpdateSenderResource = API_ROOT.concat(apiWX.UpdateSender);
const GetBackOrdersResource = API_ROOT.concat(apiWX.GetBackOrders);
const GetAllOrdersResource = API_ROOT.concat(apiWX.GetAllOrders);
const UpdateOrdersExpressStatusResource = API_ROOT.concat(apiWX.UpdateOrdersExpressStatus);
const GetOrderDetailResource = API_ROOT.concat(apiWX.GetOrderDetail);
const SavePrintOptionResource = API_ROOT.concat(apiWX.SavePrintOption);
const GetPrintOptionResource = API_ROOT.concat(apiWX.GetPrintOption);
const GetPrintOrderListResource = API_ROOT.concat(apiWX.GetPrintOrderList);

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
  GetExpressTemplateResource,
  UpdateOrderVendorResource,
  GetUnassignOrdersResource,
  GetAssignedOrdersResource,
  GetOrderVendorsResource,
  SaveUnassignOrderResource,
  GetDefaultSenderResource,
  DelSenderResource,
  UpdateSenderResource,
  GetAllOrdersResource,
  GetBackOrdersResource,
  UpdateOrdersExpressStatusResource,
  GetOrderDetailResource,
  SavePrintOptionResource,
  GetPrintOptionResource,
  GetPrintOrderListResource
};
