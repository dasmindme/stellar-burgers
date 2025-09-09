import { setCookie, getCookie } from './cookie';
import { TIngredient, TOrder, TUser } from './types';

export const BASE_URL = process.env.BURGER_API_URL;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const checkSuccess = <T extends { success: boolean }>(res: T): Promise<T> =>
  res.success
    ? Promise.resolve(res)
    : Promise.reject(`Ответ не success: ${JSON.stringify(res)}`);

export const request = <T extends { success: boolean }>(
  endpoint: string,
  options?: RequestInit
): Promise<T> =>
  fetch(`${BASE_URL}${endpoint}`, options)
    .then((res) => checkResponse<T>(res))
    .then(checkSuccess);

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

type TOrdersResponse = TServerResponse<{
  data: TOrder[];
}>;

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

export type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export type TLoginData = {
  email: string;
  password: string;
};

type TUserResponse = TServerResponse<{ user: TUser }>;

export const refreshToken = (): Promise<TRefreshResponse> =>
  request<TRefreshResponse>('/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then((refreshData) => {
    localStorage.setItem('refreshToken', refreshData.refreshToken);
    setCookie('accessToken', refreshData.accessToken);
    return refreshData;
  });

export const fetchWithRefresh = async <T extends { success: boolean }>(
  endpoint: string,
  options: RequestInit
): Promise<T> => {
  try {
    return await request<T>(endpoint, options);
  } catch (err) {
    if ((err as { message?: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as Record<string, string>).authorization =
          refreshData.accessToken;
      }
      return await request<T>(endpoint, options);
    }
    return Promise.reject(err);
  }
};

export const getIngredientsApi = () =>
  request<TIngredientsResponse>('/ingredients').then((res) => res.data);

export const getFeedsApi = () => request<TFeedsResponse>('/orders/all');

export const getOrdersApi = () =>
  fetchWithRefresh<TFeedsResponse>('/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken') || ''
    }
  }).then((res) => res.orders);

export const orderBurgerApi = (data: string[]) =>
  fetchWithRefresh<TNewOrderResponse>('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken') || ''
    },
    body: JSON.stringify({ ingredients: data })
  });

export const getOrderByNumberApi = (number: number) =>
  request<TOrderResponse>(`/orders/${number}`);

export const registerUserApi = (data: TRegisterData) =>
  request<TAuthResponse>('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export const loginUserApi = (data: TLoginData) =>
  request<TAuthResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export const forgotPasswordApi = (data: { email: string }) =>
  request<TServerResponse<{}>>('/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export const resetPasswordApi = (data: { password: string; token: string }) =>
  request<TServerResponse<{}>>('/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export const getUserApi = () =>
  fetchWithRefresh<TUserResponse>('/auth/user', {
    method: 'GET',
    headers: {
      authorization: getCookie('accessToken') || ''
    }
  });

export const updateUserApi = (user: Partial<TRegisterData>) =>
  fetchWithRefresh<TUserResponse>('/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken') || ''
    },
    body: JSON.stringify(user)
  });

export const logoutApi = () =>
  request<TServerResponse<{}>>('/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });
