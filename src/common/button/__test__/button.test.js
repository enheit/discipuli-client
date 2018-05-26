import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Button from '../button';

describe('Button component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Button type="button" positive>Button</Button>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be rendered with class \'.button--positive\'', function() {
    expect(shallow(<Button type="button" positive>Button</Button>)
      .is('.button--positive'))
      .toBe(true);
  });

  it('should be rendered with class \'.button--negative\'', function() {
    expect(shallow(<Button type="button" negative>Button</Button>)
      .is('.button--negative'))
      .toBe(true);
  });

  it('should be rendered with disabled state and class \'.button--disabled\'', function() {
    expect(shallow(<Button type="button" disabled>Button</Button>)
      .is('.button--disabled'))
      .toBe(true);
  });


  it('should be clickable', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<Button onClick={mockCallBack}>Button</Button>));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
