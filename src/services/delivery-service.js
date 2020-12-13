import request from '../utils/fetch';
import queryString from 'qs';

export const getDeliveryStat = (id) => request.get(`/mobile-builder/v1/delivery-boy-delivery-stat?delivery_boy_id=${id}`);

export const getDeliveries = (query, token) => request.get(`/wcfmmp/v1/deliveries?${queryString.stringify(query)}`, {}, token);
export const markDelivery = (data, token) =>
  request.post(`/mobile-builder/v1/mark-order-delivered`, JSON.stringify(data), 'POST', token);
