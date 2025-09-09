import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAllFeeds, getOrdersData } from '../../services/slices/feedsSlice';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrdersData);

  useEffect(() => {
    dispatch(getAllFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getAllFeeds())} />
  );
};
