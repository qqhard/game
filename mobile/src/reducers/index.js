import {combineReducers} from 'redux'
import todos from './todos'
import message from './message'
import visibilityFilter from './visibilityFilter'
import data from './get_data';
import game from './get_game';

const todoApp = combineReducers({
    todos,
    visibilityFilter,
    message,
    data,
    game,
})

export default todoApp