import React, { Fragment } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import { Star, StarBorder } from '@material-ui/icons';
import IconButton from '../IconButton/IconButton';

const propTypes = {
  classes: PropTypes.object.isRequired,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      id: PropTypes.string.isRequired,
      initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
      props: PropTypes.object, // any props that can be consumed by a component of this 'type'
      inputProps: PropTypes.array, // any props that can be passed down to the HTML component (e.g. minlength)
      validate: PropTypes.func, // returns a message string if validation fails
    }),
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
  direction: PropTypes.oneOf(['row', 'column']),
  buttonVariant: PropTypes.oneOf(['flat', 'outlined', 'contained', 'text']),
  buttonColor: PropTypes.string,
  submitButtonText: PropTypes.string,
  submitButtonIcon: PropTypes.func,
  hideSubmitButton: PropTypes.bool,
  dynamic: PropTypes.bool,
};

const defaultProps = {
  variant: 'standard',
  buttonVariant: 'text',
  buttonColor: 'default',
  hideSubmitButton: false,
  dynamic: false,
  submitButtonText: 'Save',
  direction: 'column',
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    const { components } = props;
    const initialState = {};
    components.forEach(component => {
      initialState[component.id] = component.initialValue;
    });

    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { dynamic } = props;
    if (dynamic) {
      // since this is a dynamic form, the user
      // may add or remove form fields
      // and we need to update the state when this happens

      let updateState = null;
      // check for new components
      props.components.forEach(component => {
        const { id, initialValue } = component;
        if (_.isUndefined(state[id])) {
          if (_.isNull(updateState)) {
            updateState = {};
          }
          updateState[id] = initialValue;
        }
      });

      // check for removed components
      Object.keys(state).forEach(id => {
        const corresponingPropComponent = _.find(props.components, { id });
        if (_.isEmpty(corresponingPropComponent)) {
          if (_.isNull(updateState)) {
            updateState = {};
          }
          updateState[id] = undefined;
        }
      });

      return updateState;
    }
    return null;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  handleChange(id, type) {
    return event => {
      let value;
      switch (type) {
        case 'rating':
          value = event;
          break;
        case 'switch':
          value = event.target.checked;
          break;
        default:
          value = event.target.value;
      }
      this.setState({ [id]: value });
      const validationFn = _.get(_.find(this.props.components, { id }), 'validate', false);
      if (validationFn) {
        console.log('TODO Handle Validate input...');
        const errorMsg = validationFn(value);
        console.log('errorMsg: ', errorMsg);
      }
      if (this.props.onChange) {
        this.props.onChange({ id, value });
      }
    };
  }

  renderComponent({ type, id, props, initialValue }) {
    const { classes, variant, direction } = this.props;
    const customProps = {
      margin: 'normal',
      fullWidth: true,
      ...props,
    };

    let value = this.state[id];
    if (_.isUndefined(value)) {
      value = initialValue;
    }

    if (typeof type !== 'string') {
      const CustomComponent = type;
      return <CustomComponent {...props} onChange={this.handleChange(id)} key={id} value={value} />;
    }

    const textFieldClassName = classNames({
      [classes.textField]: true,
      [classes.flex3]: direction === 'row',
    });

    switch (type.toLowerCase()) {
      case 'textfield':
        return (
          <TextField
            {...customProps}
            variant={variant}
            key={id}
            value={value || ''}
            onChange={this.handleChange(id)}
            className={textFieldClassName}
          />
        );
      case 'rating':
        return (
          <div key={id} className={classes.ratingContainer}>
            <Typography className={classes.genericFormLabel}>{props.label}</Typography>
            <Rating
              fractions={2}
              initialRating={value}
              rating={value}
              onChange={this.handleChange(id, 'rating')}
              emptySymbol={<StarBorder color="secondary" className={classes.starIcon} />}
              fullSymbol={<Star color="secondary" className={classes.starIcon} />}
            />
          </div>
        );
      case 'switch':
        return (
          <FormGroup row key={id} className={classes.switchFormGroup}>
            <div className={classes.switchLabelContainer}>
              <Typography>{props.label}</Typography>
              <Typography variant="caption">{props.subLabel}</Typography>
            </div>

            <Switch checked={value} onChange={this.handleChange(id, 'switch')} value={id} />
          </FormGroup>
        );
      case 'nativeselect':
        return (
          <Fragment key={id}>
            <InputLabel shrink htmlFor={id}>
              {props.label}
            </InputLabel>
            <NativeSelect
              className={classes.nativeSelect}
              variant={variant}
              value={value || ''}
              onChange={this.handleChange(id)}
              input={<Input id={id} />}
            >
              {props.options.map(option => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          </Fragment>
        );
      default:
        console.error(`Unknown type: ${type}`);
        return (
          <Typography>
            Unknown type:
            {type}
          </Typography>
        );
    }
  }

  renderFormComponents() {
    const { components } = this.props;
    return components.map(thisComponent =>
      // const { type, props, id } = thisComponent;
      this.renderComponent(thisComponent),
    );
  }

  renderButton() {
    const {
      classes,
      submitButtonText,
      buttonVariant,
      buttonColor,
      hideSubmitButton,
      direction,
      submitButtonIcon,
    } = this.props;
    const buttonClassName = classNames({
      [classes.button]: true,
      [classes.flex1]: direction === 'row',
    });
    if (hideSubmitButton) {
      return <input type="submit" hidden />;
    }
    if (submitButtonIcon) {
      return (
        <IconButton
          type="submit"
          variant={buttonVariant}
          color={buttonColor}
          className={buttonClassName}
          text={submitButtonText}
          icon={submitButtonIcon}
        />
      );
    }
    return (
      <Button type="submit" variant={buttonVariant} color={buttonColor} className={buttonClassName}>
        {submitButtonText}
      </Button>
    );
  }
  render() {
    const {
      classes,
      submitButtonText,
      buttonVariant,
      buttonColor,
      hideSubmitButton,
      direction,
      submitButtonIcon,
    } = this.props;
    const rootClassName = classNames({
      [classes.rootRow]: direction === 'row',
      [classes.rootColumn]: direction === 'column',
    });

    return (
      <form className={rootClassName} onSubmit={this.handleSubmit}>
        {this.renderFormComponents()}
        {this.renderButton()}
      </form>
    );
  }
}

Form.propTypes = propTypes;

Form.defaultProps = defaultProps;

export default Form;
