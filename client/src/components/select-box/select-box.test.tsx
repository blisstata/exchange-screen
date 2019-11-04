import * as React from 'react';
import { shallow } from 'enzyme';
import { SelectBox } from './select-box';

describe('SelectBox', () => {
  const props = {
    wallets: [{
      currency: 'EUR',
      balance: 50,
      formattedMoney: '€50,00'
    }, {
      currency: 'USD',
      balance: 50,
      formattedMoney: '$50,00'
    }],
    placeholder: 'test',
    show: true,
    value: '10',
    handleClick: () => {}
  }
  it('renders input', () => {
    const component = shallow(<SelectBox {...props}/>);
  
    expect(component.find('input').length).toBe(1);
  });

  it('passes `value` as prop for input', () => {
    const component = shallow(<SelectBox {...props}/>);
  
    expect(component.find('input').prop('value')).toBe('10');
  });

  describe('ul', () => {
    it('renders ul when show is true', () => {
      const component = shallow(<SelectBox {...props}/>);
  
      expect(component.find('ul').length).toBe(1);
    });

    it('does not render ul when show is true', () => {
      const component = shallow(<SelectBox {...{...props, show: false}}/>);
  
      expect(component.find('ul').length).toBe(0);
    });

    it('renders as many li as wallets length', () => {
      const component = shallow(<SelectBox {...props}/>);
  
      expect(component.find('li').length).toBe(2);
    });
  });
});
