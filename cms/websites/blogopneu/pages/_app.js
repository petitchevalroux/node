import React from 'react';
import withApollo from '../src/isomorphic/hocs/with-apollo';

const App = ({ Component, props}) => {
  return  <Component {...props} />
};

export default withApollo(App);