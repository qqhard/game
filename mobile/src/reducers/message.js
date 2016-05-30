import * as types from '../constant';

const message = (state = {}, action) => {
    switch (action.type) {
        case types.SUBMIT_SUCCESS:
            return {
                status:true
            }
        case types.SUBMIT_FAIL:
            return {
                status:false
            }
        default:
            return state
    }
}

export default message;