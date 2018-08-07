import React from 'react';
import PropTypes from 'prop-types';


class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Component: false, loading: true };
  }

  componentDidMount() {
    this.loadComponent().then(() => { console.log('TestComponent loaded.'); });
  }

  async loadComponent() {
    const Component = await import('./Test.js');
    this.setState({ loading: false, Component: Component.default });
  }

  render() {
    const props = this.props;
    const { loading, Component } = this.state;
    if (loading) {
      return (
        <div className="dynamic">
        Hello, World! Just loading this component
        </div>
      );
    }
    return <Component {...props} />;
  }
}


Test.propTypes = {
  loading: PropTypes.bool,
};

Test.defaultProps = {
  loading: false,
};


export default Test;
