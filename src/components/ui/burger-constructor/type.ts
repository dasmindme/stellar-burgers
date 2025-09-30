// components/burger-constructor/type.ts
import { TIngredient, TOrder } from '@utils-types';

export type TConstructorIngredient = TIngredient & { id: string };

export type BurgerConstructorUIProps = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
