'use strict';
var todo = (state, action) => {
  if (state === undefined) {
    state = {};
  }

  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({},
        state, {
          completed: !state.completed
        }
      )
  }
}

var todos = (state, action) => {
  if (state === undefined) {
    state = [];
  }
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([todo(state, action)]);
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};




var createStore = (reducer) => {
  let state;
  const listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);

    listeners.forEach(listener => listener());
  }

  const subscribe = (listener) => {
    listeners.push(listener);
  }
  return {
    getState, dispatch, subscribe
  };
}

const store = createStore(todos);


store.subscribe(() => { console.log(store.getState())});

store.dispatch({
  type: 'ADD_TODO',
  text: '123',
  id: 1
});

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 1
})

// var states = [];

// states.push(todos([], {}));
// console.log(states[0]);

// states.push(todos(states[0], {
//   type: 'ADD_TODO',
//   text: '123',
//   id: 1
// }));
// console.log(states[1]);

// states.push(todos(states[1], {
//   type: 'TOGGLE_TODO',
//   id: 1
// }));
// console.log(states[2]);

// console.log(states);
