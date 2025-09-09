import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useSelector } from '../../services/store';
import { getIngredientsData } from '../../services/slices/ingredientsSlice';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();

  /** TODO: взять переменную из стора */
  const ingredients: TIngredient[] = useSelector(getIngredientsData);

  const orderInfo = useMemo(() => {
    if (
      !ingredients.length ||
      !order.ingredients ||
      order.ingredients.length === 0
    )
      return null;

    const ingredientCounts: Record<string, number> = {};

    order.ingredients.forEach((id) => {
      ingredientCounts[id] = (ingredientCounts[id] || 0) + 1;
    });

    const uniqueIngredients = Object.keys(ingredientCounts)
      .map((id) => ingredients.find((ing) => ing._id === id))
      .filter((ing): ing is TIngredient => Boolean(ing));

    if (uniqueIngredients.length === 0) return null;

    const total = uniqueIngredients.reduce((sum, ingredient) => {
      const count = ingredientCounts[ingredient._id];
      const finalCount = ingredient.type === 'bun' && count === 1 ? 2 : count;
      return sum + ingredient.price * finalCount;
    }, 0);

    const ingredientsToShow = uniqueIngredients.slice(0, maxIngredients);
    const remains =
      uniqueIngredients.length > maxIngredients
        ? uniqueIngredients.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo: uniqueIngredients,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
