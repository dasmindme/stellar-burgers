import { FC, useEffect, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import {
  getOrderByNumber,
  getOrderByNumberSelector,
  isSearchSuccessSelector
} from '../../services/slices/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientsData } from '../../services/slices/ingredientsSlice';
import { OrderInfoUI, Preloader } from '@ui';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const currentNumber = Number(useParams().number);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByNumber(currentNumber));
  }, [dispatch]);
  const isSearchSuccess = useSelector(isSearchSuccessSelector);
  const orderData = useSelector(getOrderByNumberSelector);

  const ingredients: TIngredient[] = useSelector(getIngredientsData);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, itemId) => {
        const ingredient = ingredients.find((ing) => ing._id === itemId);
        if (!ingredient) return acc;

        const isBun = ingredient.type === 'bun';
        const countToAdd = isBun ? 2 : 1;

        if (!acc[itemId]) {
          acc[itemId] = {
            ...ingredient,
            count: countToAdd
          };
        } else {
          acc[itemId].count += countToAdd;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || !isSearchSuccess) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
