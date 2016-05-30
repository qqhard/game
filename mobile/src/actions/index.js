import { postLoginForm } from './submit_form';

let nextTodoId = 0
export const addTodo = (text) => {
    return (dispatch)=> {
        setTimeout(()=>{
            dispatch({
                type: 'ADD_TODO',
                id: nextTodoId++,
                text
            })
        },1000);
    }
}

export const setVisibilityFilter = (filter, dispatch) => {

    setTimeout(()=> {
        dispatch(
            {
                type: 'SET_VISIBILITY_FILTER',
                filter
            }
        )
    }, 1000);
}

export const toggleTodo = (id) => {
    console.log('test');
    return {
        type: 'TOGGLE_TODO',
        id
    }
}

