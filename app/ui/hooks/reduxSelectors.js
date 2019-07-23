import { useSelector } from 'react-redux';

export const useStoreNotifications = () => useSelector(state => state.notifications);
