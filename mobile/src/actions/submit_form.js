import * as types from '../constant/types';
import * as urls from '../constant/urls';
import { getCookieValue } from '../components/common/get_cookie_value';

export const postLoginForm = (username, password) => {
    let body = {
        username: username,
        password: password,
        _csrf: getCookieValue("XSRF-TOKEN")
    };

    return (dispatch)=> {
        $.post(urls.LOGIN_URL, body, (data)=> {
            dispatch({
                type: types.POST_LOGIN_SUCCESS
            })
        }).error((e)=> {
            dispatch({
                type: types.SUBMIT_FAIL
            });
        });
    }
}

export const postRegisterForm = (username, email, password, rePassword) => {
    let body = {
        username,
        email,
        password,
        rePassword,
        _csrf: getCookieValue("XSRF-TOKEN")
    };
    console.log(body);
    return (dispatch)=> {
        $.post(urls.REGISTER_URL, body, (data)=> {
            if(data.status == 'ok'){
                dispatch({
                    type: types.POST_REGISTER_SUCCESS
                })
            }else{
                dispatch({
                    type: types.SUBMIT_FAIL
                });
            }
        }).error((e)=> {
            dispatch({
                type: types.SUBMIT_FAIL
            });
        });
    }
}
