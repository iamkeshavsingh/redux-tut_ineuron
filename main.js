const { createStore, combineReducers, applyMiddleware } = require('redux');
const logger = require('redux-logger');
const thunk = require('redux-thunk');

// 1. Reducers functions will be Pure. (cannot have side effects)
// 2. Do not mutate the state directly. 
// 3. All you reducers will be called once in the starting with state = undefined
// 4. In combineReducers all the reducers will be executed when you use dispatch function 


// Middleware
// var loggerMiddleware = function () {
//     return function (next) {

//         return function (action) {
//             console.log('My Middleware', action);
//             next(action);
//         }
//     }
// }








function todosReducer(todos = [], action) {

    if (action.type === 'INIT_STATE') {
        return action.todos;
    }

    if (action.type === 'ADD_TODO') {
        var todo = action.todo;
        return [...todos, todo];
    }
    return todos;
}


function visibilityReducer(flag = 'all', action) {
    if (action.type === 'SHOW_COMPLETED') {
        return 'completed';
    }
    return flag;
}


const rootReducer = combineReducers({
    todos: todosReducer,
    visibilityFlag: visibilityReducer
});


var store = createStore(rootReducer, applyMiddleware(thunk.default, logger.default));



// function reducer(state, action) {

//     if (action.type === 'ADD_TODO') {
//         var todo = action.todo;
//         return { ...state, todos: [...state.todos, todo] };
//     }

//     if (action.type === 'SHOW_COMPLETED') {
//         return { ...state, visibilityFlag: 'completed' };
//     }

//     return {
//         todos: [],
//         visibilityFlag: 'all'
//     };
// }

// var store = createStore(reducer);


// Action Creators:  () => Action


store.subscribe(() => {
    console.log(store.getState())
})




store.dispatch(
    async (dispatch) => {
        // Fetch some data from api's
        setTimeout(() => {
            dispatch({
                type: 'INIT_STATE',
                todos: [{
                    title: 'INIT',
                    description: 'Hello'
                }]
            })
        }, 2000);
    }
);



// var addTodo = (title, description) => ({
//     type: 'ADD_TODO',
//     todo: {
//         title: title,
//         description: description
//     }
// });

// store.dispatch(
//     addTodo('Meeting', 'There will a Meeting at 10pm')
// )

// store.dispatch({
//     type: 'SHOW_COMPLETED',
// });

// console.log(store.getState())
























// Redux will call this for the first time; 
// Cannot do any side effects and all. This needs to be a Pure Functions
// function reducer(state, action) {
//     if (action.type === 'INCREMENT') {
//         return state + 1;
//     }

//     if (action.type === 'DECREMENT') {
//         return state - 1;
//     }
//     return 0;
// }


// const store = createStore(reducer);


// store.subscribe(() => {
//     console.log('New Counter Value', store.getState())
// });



// // Action
// // Dispatch

// var incrementAction = {
//     type: 'INCREMENT'
// }

// store.dispatch(incrementAction);

// var decrementAction = {
//     type: 'DECREMENT'
// }
// store.dispatch(decrementAction);








