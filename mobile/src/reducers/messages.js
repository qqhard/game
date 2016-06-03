import * as types from '../constant/types';

const messages = (state = {}, action) => {
    switch (action.type) {
        case types.GET_MESSAGES_LIST_SUCCESS:
            return {
                messages: action.messages
            }
        default:
            return {}
    }
}

export default messages;
