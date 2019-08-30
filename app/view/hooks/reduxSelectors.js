import { useSelector } from 'react-redux';

export const useStoreNotifications = () => useSelector(state => state.notifications);

export const useStoreSnacks = () => useSelector(state => state.snacks);

export const useStoreLoginForm = () => useSelector(state => state.loginForm);
