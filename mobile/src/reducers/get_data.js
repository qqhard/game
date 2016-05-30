import * as types from '../constant';

const data = (state = {}, action) => {
    switch (action.type) {
        case types.GET_GAME_ENTRYED_LIST_SUCCESS:
            return {
                games: action.games
            }
        case types.GET_DATA_FAIL:
            return {
                status: false
            }
        default:
            return state
    }
}

export default data;
