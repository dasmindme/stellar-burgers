import { expect, describe, it } from '@jest/globals';
import {
  getUserAuth,
  getUserOrders,
  initialState,
  loginUser,
  makeLoginUserSuccess,
  newUserOrder,
  registerUser,
  setLastOrder,
  updateUserData,
  userLogout,
  userSliceReducer
} from '../userSlice';

describe('тесты экшенов userSlice', () => {
  const expectedResult = {
    success: true,
    accessToken: '',
    refreshToken: '',
    user: {
      email: 'example@example.com',
      name: 'user'
    }
  };

  describe('тест запроса на получение пользователя', () => {
    const expectedResult = {
      success: true,
      user: {
        email: 'test@example.com',
        name: 'example'
      }
    };

    test('запрос fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        getUserAuth.fulfilled(expectedResult, 'fulfilled')
      );
      expect(state.user).toEqual(expectedResult.user);
      expect(state.loading).toBe(false);
      expect(state.success).toBe(true);
    });

    test('запрос pending', () => {
      const state = userSliceReducer(
        initialState,
        getUserAuth.pending('pending')
      );
      expect(state.loading).toBe(true);
      expect(state.success).toBe(false);
    });

    test('запрос rejected', () => {
      const state = userSliceReducer(
        initialState,
        getUserAuth.rejected(new Error('error'), 'rejected')
      );
      expect(state.user).toEqual(initialState.user);
      expect(state.loading).toBe(false);
      expect(state.success).toBe(false);
    });
  });

  describe('тест запроса на логин пользователя', () => {
    test('запрос fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        loginUser.fulfilled(expectedResult, 'fulfilled', {
          email: expectedResult.user.email,
          password: '123'
        })
      );

      expect(state.loading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.user).toEqual(expectedResult.user);
    });

    test('запрос pending', () => {
      const state = userSliceReducer(
        initialState,
        loginUser.pending('pending', {
          email: expectedResult.user.email,
          password: '123'
        })
      );

      expect(state.loading).toBe(true);
    });

    test('запрос rejected', () => {
      const state = userSliceReducer(
        initialState,
        loginUser.rejected(new Error('error'), 'rejected', {
          email: expectedResult.user.email,
          password: '123'
        })
      );

      expect(state.loading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.user).toEqual(initialState.user);
    });
  });

  describe('тест запроса регистрации пользователя', () => {
    test('запрос fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        registerUser.fulfilled(expectedResult, 'fulfilled', {
          email: expectedResult.user.email,
          name: expectedResult.user.name,
          password: '123'
        })
      );
      expect(state.loading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.user).toEqual(expectedResult.user);
    });

    test('запрос pending', () => {
      const state = userSliceReducer(
        initialState,
        registerUser.pending('fulfilled', {
          email: expectedResult.user.email,
          name: expectedResult.user.name,
          password: '123'
        })
      );
      expect(state.loading).toBe(true);
      expect(state.success).toBe(false);
    });

    test('запрос rejected', () => {
      const state = userSliceReducer(
        initialState,
        registerUser.rejected(new Error('error'), 'rejected', {
          email: expectedResult.user.email,
          name: expectedResult.user.name,
          password: '123'
        })
      );
      expect(state.loading).toBe(false);
      expect(state.success).toBe(false);
    });
  });

  describe('тест запроса на обновления данных пользователя', () => {
    test('запрос fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        updateUserData.fulfilled(expectedResult, 'fulfilled', {
          email: expectedResult.user.email,
          name: expectedResult.user.name,
          password: '123'
        })
      );
      expect(state.loading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.user).toEqual(expectedResult.user);
    });

    test('запрос pending', () => {
      const state = userSliceReducer(
        initialState,
        updateUserData.pending('fulfilled', {
          email: expectedResult.user.email,
          name: expectedResult.user.name,
          password: '123'
        })
      );
      expect(state.loading).toBe(true);
      expect(state.success).toBe(false);
    });

    test('запрос rejected', () => {
      const state = userSliceReducer(
        initialState,
        updateUserData.rejected(new Error('error'), 'rejected', {
          email: expectedResult.user.email,
          name: expectedResult.user.name,
          password: '123'
        })
      );
      expect(state.loading).toBe(false);
      expect(state.success).toBe(false);
    });
  });

  describe('тест запроса на логаут пользователя', () => {
    test('запрос fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        userLogout.fulfilled({ success: false }, 'fulfilled')
      );
      expect(state.loading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.user).toEqual(initialState.user);
    });

    test('запрос pending', () => {
      const state = userSliceReducer(
        initialState,
        userLogout.pending('fulfilled')
      );
      expect(state.loading).toBe(true);
      expect(state.success).toBe(false);
    });

    test('запрос rejected', () => {
      const state = userSliceReducer(
        initialState,
        userLogout.rejected(new Error('error'), 'rejected')
      );
      expect(state.loading).toBe(false);
      expect(state.success).toBe(false);
    });
  });

  describe('тест запроса на заказы пользователя', () => {
    const expectedOrders = [
      {
        _id: '665d7a5097ede0001d06e7a1',
        ingredients: ['68dff228673086001ba8bb42', '', '', ''],
        status: 'done',
        name: 'Флюоресцентный spicy бессмертный бургер',
        createdAt: '2025-10-03T15:56:24.012Z',
        updatedAt: '2025-10-03T15:56:25.442Z',
        number: 90274
      },
      {
        _id: '68dfdedf673086001ba8bb32',
        ingredients: ['643d69a5c3f7b9001cfa0941', '', ''],
        status: 'done',
        name: 'Краторный spicy био-марсианский бургер',
        createdAt: '2025-10-03T14:34:07.826Z',
        updatedAt: '2025-10-03T14:34:08.907Z',
        number: 90272
      }
    ];
    test('запрос fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        getUserOrders.fulfilled(expectedOrders, 'fulfilled')
      );
      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(expectedOrders);
    });

    test('запрос pending', () => {
      const state = userSliceReducer(
        initialState,
        getUserOrders.pending('fulfilled')
      );
      expect(state.loading).toBe(true);
    });

    test('запрос rejected', () => {
      const state = userSliceReducer(
        initialState,
        getUserOrders.rejected(new Error('error'), 'rejected')
      );
      expect(state.loading).toBe(false);
    });
  });

  describe('тест запроса на новый заказ пользователя', () => {
    const expectedOrders = {
      success: true,
      name: 'Space флюоресцентный метеоритный бургер',
      order: {
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0943'
        ],
        _id: '68e0033e673086001ba8bb59',
        owner: {
          name: 'Ira',
          email: 'irina_vlasova_2000@mail.ru',
          createdAt: '2025-10-03T17:09:18.766Z',
          updatedAt: '2025-10-03T17:09:19.900Z'
        },
        status: 'done',
        name: 'Space флюоресцентный метеоритный бургер',
        createdAt: '2025-10-03T17:09:18.766Z',
        updatedAt: '2025-10-03T17:09:19.900Z',
        number: 90279,
        price: 5056
      }
    };

    test('запрос fulfilled', () => {
      const state = userSliceReducer(
        initialState,
        newUserOrder.fulfilled(expectedOrders, 'fulfilled', [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0940'
        ])
      );
      expect(state.loading).toBe(false);
      expect(state.orders[0]).toEqual(expectedOrders.order);
      expect(state.lastOrder).toEqual(expectedOrders.order);
      expect(state.orderRequestData).toBe(false);
    });

    test('запрос pending', () => {
      const state = userSliceReducer(
        initialState,
        newUserOrder.pending('fulfilled', [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0940'
        ])
      );
      expect(state.loading).toBe(true);
      expect(state.orderRequestData).toEqual(true);
    });

    test('запрос rejected', () => {
      const state = userSliceReducer(
        initialState,
        newUserOrder.rejected(new Error('error'), 'rejected', [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0940'
        ])
      );
      expect(state.loading).toBe(false);
      expect(state.orderRequestData).toBe(false);
    });
  });

  test('тест экшена изменения состаяния авторизации', () => {
    const state = userSliceReducer(initialState, makeLoginUserSuccess(true));
    expect(state.success).toBe(true);
  });

  test('текст экшена изменения значения последнего заказа', () => {
    const state = userSliceReducer(initialState, setLastOrder(null));
    expect(state.lastOrder).toBe(null);
  });
});
