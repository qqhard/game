import * as types from '../constant/types';

const entry = (state = {}, action) => {
    switch (action.type) {
        // case types.POST_REGISTER_SUCCESS:
        //     return {
        //         stepIndex:1
        //     }
        // case types.POST_LOGIN_SUCCESS:
        //     return {
        //         stepIndex:2
        //     }
        // case types.PUT_USERINFO_SUCCESS:
        //     return {
        //         stepIndex:3
        //     }
        // case types.POST_ENTRY_SUCCESS:
        //     return {
        //         stepIndex:4
        //     }
        case types.SET_ENTRY_STEP:
            return {
                stepIndex: action.stepIndex
            }
        case types.GET_DATA_FAIL:
            return {
                status: false
            }
        default:
            return state
    }
}

export default entry;
