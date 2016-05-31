import * as types from '../constant/types';

const message = (state = {}, action) => {
    switch (action.type) {
        case types.POST_LOGIN_SUCCESS:
            return {
                status:true
            }
        case types.POST_REGISTER_SUCCESS:
            return {
                status:true
            }
        case types.PUT_USERINFO_SUCCESS:
            return {
                status:true
            }
        case types.SUBMIT_FAIL:
            return {
                status:false
            }
        default:
            return {} 
    }
}

export default message;