// import React from 'react';
// import { createStore } from 'redux'
// import noteReducer from './reducers/noteReducer'
// import './App.css';

// const store = createStore(noteReducer)

// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'hello world',
//     important: true,
//     id: 1
//   }
// })

// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'how are you?',
//     important: true,
//     id: 2
//   }
// })

// const generateId = () => {
//   Number((Math.random() * 1000000).toFixed(0))
// }

// function App() {
//   const addNote = (event) => {
//     event.preventDefault()
//     const content = event.target.note.value
//     event.target.note.value = ''
//     store.dispatch({
//       type: 'NEW_NOTE',
//       data: {
//         content,
//         important: false,
//         id: generateId()
//       }
//     })
//   }

//   const toggleImportance = (id) => {
//     console.log('testing importance toggling')
//     store.dispatch({
//       type: 'TOGGLE_IMPORTANCE',
//       data: { id }
//     })
//   }

//   return (
//     <div className="App">
//       <form onSubmit={addNote}>
//         <input name="note" />
//         <button type="submit">add</button>
//       </form>
//       <ul>
//         {store.getState().map(note =>
//           <li 
//             key={note.id}
//             onClick={() => toggleImportance(note.id)}
//           >
//             {note.content} <strong>{note.important ? 'important' : ''}</strong>
//           </li>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default App;
