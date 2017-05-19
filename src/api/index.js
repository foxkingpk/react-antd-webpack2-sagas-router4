import HTTP from 'HTTP';
import { LoginResource, LogoutResource, OrderListNewResource, OrderListFinishResource, OrderStateResource, SendersResource, AddSenderResource, ChangeDefaultPrinterResource, GetDefaultPrinterResource, GetOrderPrintDataResource, GetExpressTemplateResource, UpdateOrderVendorResource, GetUnassignOrdersResource, GetAssignedOrdersResource, GetOrderVendorsResource, SaveUnassignOrderResource } from './resource.js';

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
    return HTTP.Get(SaveUnassignOrderResource, payload);
  },
  getOrderState() {
    return HTTP.Get(OrderStateResource);
    // return HTTP.Get("http://localhost:3000/api/orderState");
  }
};
