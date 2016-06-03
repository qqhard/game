import {combineReducers} from 'redux'
import message from './message'
import messages from './messages'
import data from './get_data';
import game from './get_game';
import entry from './entry'

const todoApp = combineReducers({
    message,
    messages,
    data,
    game,
    entry,
})

export default todoApp