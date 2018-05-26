import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Headline from '../headline';

describe('Headline component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Headline title="Headline" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be rendered with class \'.headline--large\'', function() {
    expect(shallow(<Headline title="Headline" large />)
      .is('.headline--large'))
      .toBe(true);
  });

  it('should be rendered with class \'.headline--small\'', function() {
    expect(shallow(<Headline title="Headline" small />)
      .is('.headline--small'))
      .toBe(true);
  });
});
