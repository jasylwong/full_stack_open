import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note}/>
  )

  // component.debug()

  const li = component.container.querySelector('li')
  // console.log(prettyDOM(li));
  
  // Method 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  // Method 2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()

  // Method 3
  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'testing the event handler',
    important: true
  }

  const mockHandler = jest.fn()
  
  const component = render(
    <Note note={note} toggleImportanceOfNote={mockHandler} />
    )
    
    const button = component.getByText('Make not important')
    fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
})