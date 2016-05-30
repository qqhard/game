import * as types from '../constant';
import * as urls from '../urls';
import {getCookieValue} from '../components/common/get_cookie_value';

export const postLoginForm = (username, password) => {
    let body = {
        username: username,
        password: password,
        _csrf: getCookieValue("XSRF-TOKEN") 
    };
    
    return (dispatch)=>{
        $.post(urls.LOGIN_URL,body,(data)=>{
            dispatch({
                type: types.SUBMIT_SUCCESS
            })
        }).error((e)=>{
            dispatch({
                type: types.SUBMIT_FAIL 
            });
        });
    }
}
