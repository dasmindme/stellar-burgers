import { expect, describe, it } from '@jest/globals';
import {
  feedsSliceReducer,
  getAllFeeds,
  getOrderByNumber,
  initialState
} from '../feedsSlice';
import { mockFeedsData } from '../mockFeedsData';

const resultById = {
  success: true,
  orders: [
    {
      _id: '68dff2de673086001ba8bb45',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0940'],
      status: 'done',
      name: 'Краторный метеоритный бургер',
      createdAt: '2025-10-03T15:59:26.693Z',
      updatedAt: '2025-10-03T15:59:28.022Z',
      number: 90275
    }
  ]
};

describe('тест экшенов feedsSlice', () => {
  test('тест загрузки ленты заказов', async () => {
    const state = feedsSliceReducer(
      initialState,
      getAllFeeds.fulfilled(mockFeedsData, 'fulfilled')
    );
    expect(state.loadingData).toBe(false);
    expect(state.orders).toEqual(mockFeedsData.orders);
  });

  test('тест сообщения ошибки при rejected', async () => {
    const state = feedsSliceReducer(
      initialState,
      getAllFeeds.rejected(new Error('error'), 'rejected')
    );
    expect(state.loadingData).toBe(false);
    expect(state.error).toBe('error');
  });

  test('тест состояния загрузи при pending', async () => {
    const state = feedsSliceReducer(
      initialState,
      getAllFeeds.pending('pending')
    );
    expect(state.loadingData).toBe(true);
  });

  test('тест получения заказа по id fulfilled', () => {
    const state = feedsSliceReducer(
      initialState,
      getOrderByNumber.fulfilled(
        resultById,
        'fulfilled',
        +'68dff2de673086001ba8bb45'
      )
    );
    expect(state.loadingData).toBe(false);
    expect(state.orderByNumber).toEqual(resultById);
    expect(state.error).toBe(null);
  });

  test('тест получения заказа по id pending', () => {
    const state = feedsSliceReducer(
      initialState,
      getOrderByNumber.pending('pending', +'68dff2de673086001ba8bb45')
    );
    expect(state.loadingData).toBe(true);
    expect(state.error).toBe(null);
  });

  test('тест получения заказа по id rejected', () => {
    const state = feedsSliceReducer(
      initialState,
      getOrderByNumber.rejected(
        new Error('error'),
        'rejected',
        +'68dff2de673086001ba8bb45'
      )
    );
    expect(state.loadingData).toBe(false);
    expect(state.error).toBe('error');
  });
});
