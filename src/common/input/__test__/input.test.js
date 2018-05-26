import React from 'react';
import { shallow } from 'enzyme';

import Input from '../input';

it('should call onChange prop', () => {
  const onChangeMock = jest.fn();
  const expectedValue = 'Expected value!';
  const component = shallow(
    <Input
      name="input"
      type="text"
      value=""
      onChange={onChangeMock}
    />
  );
  component.find('input').simulate('change', 'Expected value!');
  expect(onChangeMock).toBeCalledWith(expectedValue);
});