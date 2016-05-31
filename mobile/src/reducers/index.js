import {combineReducers} from 'redux'
import message from './message'
import data from './get_data';
import game from './get_game';
import entry from './entry'

const todoApp = combineReducers({
    message,
    data,
    game,
    entry,
})

export default todoApp