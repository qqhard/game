import * as types from '../constant/types';
import * as urls from '../constant/urls';
import {getCookieValue} from '../components/common/get_cookie_value';

export const postLoginForm = (username, password,callBack) => {
    let body = {
        username: username,
        password: password,
        _csrf: getCookieValue("XSRF-TOKEN")
    };

    return (dispatch)=> {
        $.post(urls.LOGIN_URL, body, (data)=> {
            dispatch({
                type: types.POST_LOGIN_SUCCESS
            });
            if(!!callBack)callBack();
        }).error((e)=> {
            dispatch({
                type: types.SUBMIT_FAIL
            });
        });
    }
}


export const postRegisterForm = (username, email, password, rePassword, callBack) => {
    let body = {
        username,
        email,
        password,
        rePassword,
        _csrf: getCookieValue("XSRF-TOKEN")
    };
    return (dispatch)=> {
        $.post(urls.REGISTER_URL, body, (data)=> {
            if (data.status == 'ok') {
                dispatch({
                    type: types.POST_REGISTER_SUCCESS
                });
                if(!!callBack)callBack();
            } else {
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

export const putUserinfoForm = (studentid, sociolname, phone, email, provinceid, collegeid, instituteid, callBack) => {
    let body = {
        studentid,
        sociolname,
        phone,
        email,
        provinceid,
        collegeid,
        instituteid,
        _csrf: getCookieValue("XSRF-TOKEN")
    };
    return (dispatch)=> {
        $.ajax({
            url: urls.USERINFO_URL,
            type: 'PUT',
            data: body,
            success: (data)=> {
                dispatch({
                    type: types.PUT_USERINFO_SUCCESS,
                });
                if(!!callBack)callBack();
            },
            error: (e)=> {
                dispatch({
                    type: types.SUBMIT_FAIL
                });
            }
        });
    }
}

export const postEntryForm = (body,callBack) => {
    body._csrf = getCookieValue("XSRF-TOKEN")
    return (dispatch) => {
        $.post(urls.ENTRY_URL, body, (data)=> {
            if (data.status == 'ok') {
                dispatch({type: types.POST_ENTRY_SUCCESS});
                if(!!callBack)callBack();
            } else {
                dispatch({type: types.SUBMIT_FAIL});
            }
        }).error((e)=> {
            dispatch({type: types.SUBMIT_FAIL});
        });
    }
}