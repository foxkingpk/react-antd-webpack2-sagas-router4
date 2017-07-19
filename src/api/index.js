import HTTP from '../http/index';
import {
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
  UpdateOrdersExpressStatusResource,
  GetOrderDetailResource,
  GetAllOrdersResource,
  GetBackOrdersResource,
  SavePrintOptionResource,
  GetPrintOptionResource,
  GetPrintOrderListResource
} from './resource.js';

export default {
  getLoginResource(data) {
    return HTTP.Post(LoginResource, data);
  },
  getLogoputResource() {
    return HTTP.Get(LogoutResource);
  },
  getOrderListNewResource(payload) {
    return HTTP.Get(OrderListNewResource, payload);
  },
  getOrderListFinishResource(payload) {
    return HTTP.Get(OrderListFinishResource, payload);
  },
  getSendersResource(payload) {
    return HTTP.Get(SendersResource, payload);
  },
  addSenderResource(payload) {
    return HTTP.Post(AddSenderResource, payload);
  },
  changeDefaultPrinter(payload) {
    return HTTP.Post(ChangeDefaultPrinterResource, payload);
  },
  getDefaultPrinter(payload) {
    return HTTP.Get(GetDefaultPrinterResource, payload);
  },
  getOrderPrintDataResource(payload) {
    return HTTP.Get(GetOrderPrintDataResource, payload);
  },
  getExpressTemplateResource(payload) {
    return HTTP.Get(GetExpressTemplateResource, payload);
  },
  updateOrderVendorResource(payload) {
    return HTTP.Get(UpdateOrderVendorResource, payload);
  },
  getUnassignOrdersResource(payload) {
    return HTTP.Get(GetUnassignOrdersResource, payload);
  },
  getAssignedOrdersResource(payload) {
    return HTTP.Get(GetAssignedOrdersResource, payload);
  },
  getOrderVendorsResource(payload) {
    return HTTP.Get(GetOrderVendorsResource, payload);
  },
  saveUnassignOrderResource(payload) {
    return HTTP.Post(SaveUnassignOrderResource, payload);
  },
  getDefaultSenderResource(payload) {
    return HTTP.Get(GetDefaultSenderResource, payload);
  },
  delSenderResource(payload) {
    return HTTP.Get(DelSenderResource, payload);
  },
  updateSenderResource(payload) {
    return HTTP.Post(UpdateSenderResource, payload);
  },
  updateOrdersExpressStatusResource(payload) {
    return HTTP.Post(UpdateOrdersExpressStatusResource, payload);
  },
  getOrderDetailResource(payload) {
    return HTTP.Get(GetOrderDetailResource, payload);
  },
  getAllOrdersResource(payload) {
    return HTTP.Get(GetAllOrdersResource, payload);
  },
  getBackOrdersResource(payload) {
    return HTTP.Get(GetBackOrdersResource, payload);
  },
  savePrintOptionResource(payload) {
    return HTTP.Post(SavePrintOptionResource, payload);
  },
  getPrintOptionResource(payload) {
    return HTTP.Get(GetPrintOptionResource, payload);
  },
  getPrintOrderListResource(payload) {
    return HTTP.Get(GetPrintOrderListResource, payload);
  },
  getOrderState() {
    return HTTP.Get(OrderStateResource);
    // return HTTP.Get("http://localhost:3000/api/orderState");
  }
};
