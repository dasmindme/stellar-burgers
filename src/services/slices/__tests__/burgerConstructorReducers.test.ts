import { expect, describe, it, test } from '@jest/globals';
import {
  addIngredientToConstructor,
  burgerConstructorSliceReducer,
  downPositionOfIngredient,
  initialState,
  removeIngredientFromConstructor,
  upPositionOfIngredient
} from '../burgerConstructor';

const customBun = {
  id: 'zgLfj3Sx_7Bx7bTX4U71A',
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const customIngredient = {
  id: 'IR1R_ZJA-zRpoebahtv-K',
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const testIngredient = {
  id: 'testId',
  _id: '_testId',
  name: 'testName',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

describe('Тесты экшенов конструктора бургера', () => {
  describe('Добавление продукта', () => {
    test('Добавление в список булок', () => {
      const newState = burgerConstructorSliceReducer(
        initialState,
        addIngredientToConstructor(customBun)
      );
      expect(newState.constructorBun).toEqual(customBun);
    });

    test('Добавление в список ингредиентов', () => {
      const newState = burgerConstructorSliceReducer(
        initialState,
        addIngredientToConstructor(customIngredient)
      );
      expect(newState.constructorIngredients).toEqual([customIngredient]);
    });
  });

  describe('Удаление продукта', () => {
    test('Удаление булки', () => {
      const prevState = burgerConstructorSliceReducer(
        initialState,
        addIngredientToConstructor(customBun)
      );
      const newState = burgerConstructorSliceReducer(
        prevState,
        removeIngredientFromConstructor(customBun.id)
      );
      expect(newState.constructorBun).toEqual(prevState.constructorBun);
    });

    test('Удаление ингредиента', () => {
      const prevState = burgerConstructorSliceReducer(
        initialState,
        addIngredientToConstructor(customIngredient)
      );
      const newState = burgerConstructorSliceReducer(
        prevState,
        removeIngredientFromConstructor(customIngredient.id)
      );
      expect(newState.constructorIngredients).toHaveLength(0);
    });
  });

  describe('Перемещение продукта', () => {
    const stateWithTwoIngredients = {
      constructorBun: null,
      constructorIngredients: [customIngredient, testIngredient]
    };

    const expectedOrder = [testIngredient, customIngredient];

    test('перемещение вверх', () => {
      const newState = burgerConstructorSliceReducer(
        stateWithTwoIngredients,
        upPositionOfIngredient(testIngredient.id)
      );
      expect(newState.constructorIngredients).toEqual(expectedOrder);
    });

    test('перемещение вниз', () => {
      const newState = burgerConstructorSliceReducer(
        stateWithTwoIngredients,
        downPositionOfIngredient(customIngredient.id)
      );
      expect(newState.constructorIngredients).toEqual(expectedOrder);
    });
  });
});
