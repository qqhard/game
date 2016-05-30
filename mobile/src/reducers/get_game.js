/**
 * Created by hard on 16-5-30.
 */
import * as types from '../constant';

const game = (state = {}, action) => {
    switch (action.type) {
        case types.GET_GAME_SUCCESS:
            return {
                game: action.game
            }
        case types.GET_GAME_DETAIL_SUCCESS:
            return {
                gameDetail: action.gameDetail,
                game: state.game
            }
        case types.GET_DATA_FAIL:
            return {
                status: false
            }
        default:
            return state
    }
}

export default game;
