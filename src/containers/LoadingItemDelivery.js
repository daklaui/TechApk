import * as React from 'react';
import Card from '../components/Card';
import {shadowDefault} from '../utils/shadow';

function LoadingItemDelivery(props) {
  const {style, ...rest} = props;
  return (
    <Card
      {...rest}
      style={[{height: 125, borderRadius: 8, ...shadowDefault}, style]}
    />
  );
}

export default LoadingItemDelivery;
