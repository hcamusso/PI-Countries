import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import App from './App'
import { unmountComponentAtNode } from 'react-dom'

test('renders content', () => {


  const component = render(
    <App />
  )

  expect(component.container).toHaveTextContent(
    'EnterCountries of the'
  )

  component.debug()
  });
