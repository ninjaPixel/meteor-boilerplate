import React from 'react';
import PropTypes from 'prop-types';


class DeferredComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Component: false, loading: true };
  }
  componentDidMount() {
    this.loadComponent().then(() => { console.log('Component loaded ✌️'); });
  }
  async loadComponent() {
    console.log('this.props.importFunction: ', this.props.importFunction);
    const Component = await this.props.importFunction();
    console.log('Component: ', Component);
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

DeferredComponent.propTypes = {
  importFunction: PropTypes.func.isRequired,
};


export default DeferredComponent;
