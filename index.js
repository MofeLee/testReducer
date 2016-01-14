'use strict';
const todo = (state, action) => {
  state = state || {};

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

const todos = (state, action) => {
  state = state || [];

  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([todo(state, action)]);
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state, action) => {
  state = state || 'SHOW_ALL';

  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const combineReducers = (reducers) => {
  return (state, action) => {
    state = state || {};
    return Object.keys(reducers).reduce(
      (previousState, key) => { // 返回一个包含所有组件更新状态后的状态树对象
        previousState[key] = reducers[key](
          state[key],
          action
        );
        return previousState;
      },
      {}
    ); // 不能传state进来，否则会mutating整个应用的状态
  }
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

// const todoApp = (state, action) => {
//   state = state || {};
//   return {
//     todos: todos(
//       state.todos,
//       action
//     ),
//     visibilityFilter: visibilityFilter(
//       state.visibilityFilter,
//       action
//     )
//   }
// }


const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);

    listeners.forEach(listener => listener());
  }

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }

  dispatch({}); // 初始化state

  return {
    getState, dispatch, subscribe
  };
}

////////////////////////////////execute

const store = createStore(todoApp);


const unSubscribe = store.subscribe(() => {
  console.log(store.getState())
});

store.dispatch({
  type: 'ADD_TODO',
  text: '123',
  id: 1
});

// unSubscribe();

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 1
});

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});

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
