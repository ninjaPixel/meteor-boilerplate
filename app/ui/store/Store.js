import React from 'react';
import PropTypes from 'prop-types';

export const Store = React.createContext();

const propTypes = {
  children: PropTypes.element.isRequired,
  state: PropTypes.object.isRequired,
  eventHandlers: PropTypes.object.isRequired,
};

export function StoreProvider(props) {
  const { children, state, eventHandlers } = props;

  const value = { state, eventHandlers };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}

StoreProvider.propTypes = propTypes;
