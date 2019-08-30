import { useSelector } from 'react-redux';
import { LOGIN_FORM_KEY } from '../../controller/reducers/constants';

export const useStoreNotifications = () => useSelector(state => state.notifications);

export const useStoreUser = () => useSelector(state => state.user);

export const useStoreSnacks = () => useSelector(state => state.snacks);

export const useStoreComponentLoginForm = () => useSelector(state => state.components[LOGIN_FORM_KEY]);
