import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

describe("Test App Component",()=>{
  let wrapper =  render(<App />);
  beforeEach(()=>{

  })
  test('renders learn react link', () => {
    const { getByText } = wrapper;
    const linkElement = getByText(/login here/i);
    expect(linkElement).toBeInTheDocument();
  });
 test('app UI Regression ', ()=>{
   expect(wrapper).toMatchSnapshot();
 })
})