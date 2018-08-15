import _ from 'lodash';

const _somethingHasChanged = function (propsFields, props, nextProps) {
  let somethingHasChanged = false;
  propsFields.forEach((field) => {
    const oldValue = _.get(props, field, 'special~magic~string');
    const newValue = _.get(nextProps, field, 'special~magic~string');
    if (!somethingHasChanged && !_.isEqual(oldValue, newValue)) {
      somethingHasChanged = true;
    }
  });
  return somethingHasChanged;
};
export default ({ props, nextProps, propsFields, state, nextState, stateFields }) => {
  let somethingHasChanged = _somethingHasChanged(propsFields, props, nextProps);
  if (!somethingHasChanged) {
    somethingHasChanged = _somethingHasChanged(stateFields, state, nextState);
  }
  return somethingHasChanged;
};