import { expect, describe, it } from '@jest/globals';
import {
  getIngredients,
  ingredientsSliceReducer,
  initialState
} from '../ingredientsSlice';
import { ingredients } from '../mockIngredientsData';

describe('тест асинхронных экшенов', () => {
  const result = ingredients;

  test('тест загрузки ингредиентов', async () => {
    const state = ingredientsSliceReducer(
      initialState,
      getIngredients.fulfilled(result, 'fulfilled')
    );
    expect(state.loadingData).toBe(false);
    expect(state.ingredients).toEqual(result);
  });

  test('тест сообщения ошибки при rejected', async () => {
    const state = ingredientsSliceReducer(
      initialState,
      getIngredients.rejected(new Error('error'), 'rejected')
    );
    expect(state.loadingData).toBe(false);
    expect(state.error).toBe('error');
  });

  test('тест состояния загрузи при pending', async () => {
    const state = ingredientsSliceReducer(
      initialState,
      getIngredients.pending('pending')
    );
    expect(state.loadingData).toBe(true);
  });
});
