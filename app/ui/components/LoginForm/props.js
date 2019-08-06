import PropTypes from 'prop-types';

export const commonProps = {
  propTypes: {
    user: PropTypes.object,
    loginCallback: PropTypes.func,
    email: PropTypes.string,
    disableEmail: PropTypes.bool,
    loginButtonText: PropTypes.string,
    registerButtonText: PropTypes.string,
    disableAutoFocus: PropTypes.bool,
    location: PropTypes.object.isRequired,
  },
  defaultProps: {
    user: null,
    loginCallback: () => {},
    email: '',
    disableEmail: false,
    disableAutoFocus: false,
    loginButtonText: 'Login',
    registerButtonText: 'Register',
  },
};
