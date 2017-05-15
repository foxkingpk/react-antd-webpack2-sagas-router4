import HTTP from 'HTTP';
import { LoginResource, LogoutResource, OrdersResource, OrderStateResource } from './resource.js';

export default {
  getLoginResource(data) {
    return HTTP.Post(LoginResource, data);
  },
  getLogoputResource() {
    return HTTP.Get(LogoutResource);
  },
  getOrders() {
    return HTTP.Get(OrdersResource);
  },
  getOrderState() {
    return HTTP.Get(OrderStateResource);
    // return HTTP.Get("http://localhost:3000/api/orderState");
  }
};
