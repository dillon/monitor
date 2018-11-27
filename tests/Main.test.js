// __tests__/Main-test.js
import React from 'react';
import Main from '../screens/Main';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});