import { expect, describe, it } from '@jest/globals';
import { combineReducers } from 'redux';
import { ingredientsSliceReducer } from '../slices/ingredientsSlice';
import { burgerConstructorSliceReducer } from '../slices/burgerConstructor';
import { feedsSliceReducer } from '../slices/feedsSlice';
import { userSliceReducer } from '../slices/userSlice';

describe('Root Reducer', () => {
  it('should combine all slice reducers correctly', () => {
    const rootReducer = combineReducers({
      ingredients: ingredientsSliceReducer,
      constructorItems: burgerConstructorSliceReducer,
      feeds: feedsSliceReducer,
      auth: userSliceReducer
    });

    const initAction = { type: '@@redux/INIT' };
    const initialState = rootReducer(undefined, initAction);

    expect(initialState).toEqual({
      ingredients: ingredientsSliceReducer(undefined, initAction),
      constructorItems: burgerConstructorSliceReducer(undefined, initAction),
      feeds: feedsSliceReducer(undefined, initAction),
      auth: userSliceReducer(undefined, initAction)
    });
  });
});
