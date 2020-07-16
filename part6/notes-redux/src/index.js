import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

import './App.css';

import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'


const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)


ReactDOM.render(
  // <Provider store={store}>
  //   <App />
  // </Provider>,
  <div />,
  document.getElementById('root')
  )
  
  store.subscribe(() => console.log(store.getState()))
  store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))
  store.dispatch(filterChange('IMPORTANT'))