import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, getUserOrders } from '../../services/slices/userSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrders);

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(getUserOrders());
    }
  }, [dispatch, orders]);

  return <ProfileOrdersUI orders={orders} />;
};
