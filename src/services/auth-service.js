import request from '../utils/fetch';

export const loginWithEmail = (data) => request.post('/mobile-builder/v1/login', data);

export const logout = () => request.get('/mobile-builder/logout');

export const isLogin = () => request.get('/mobile-builder/is-login');

export const updateCustomer = (user_id, data, token) =>
  request.put(
    `/mobile-builder/v1/customers/${user_id}`,
    JSON.stringify(data),
    token,
  );
