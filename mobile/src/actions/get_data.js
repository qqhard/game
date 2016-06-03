import * as types from '../constant/types';
import * as urls from '../constant/urls';

export const getGameEntryedList = () => {
    return (dispatch)=> {
        $.get(urls.GET_GAME_ENTRYED_LIST_URL, (data)=> {
            dispatch({
                type: types.GET_GAME_ENTRYED_LIST_SUCCESS,
                games: data
            })
        }).error((e)=> {
            dispatch({
                type: types.GET_DATA_FAIL
            });
        });
    }
}

export const getTeamEntryedList = () => {
    return (dispatch)=> {
        $.get(urls.GET_TEAM_ENTRYED_LIST_URL, (data)=> {
            dispatch({
                type: types.GET_TEAM_ENTRYED_LIST_SUCCESS,
                teams: data
            });
        }).error((e)=> {
            dispatch({
                type: types.GET_DATA_FAIL
            });
        });
    }
}

export const getGame = (gamename) => {
    return (dispatch)=> {
        $.get(`${urls.GET_GAME_URL}${gamename}`, (data)=> {
            dispatch({
                type: types.GET_GAME_SUCCESS,
                game: data
            });
        }).error((e)=> {
            dispatch({
                type: types.GET_DATA_FAIL
            });
        });
    }
}

export const getGameDetail = (gamename) => {
    return (dispatch) => {
        $.get(`${urls.GET_GAME_DETAIL_URL}${gamename}`, (data)=> {
            console.log(data);
            dispatch({
                type: types.GET_GAME_DETAIL_SUCCESS,
                gameDetail: data.text
            });
        }).error((e)=> {
            dispatch({
                type: types.GET_DATA_FAIL
            });
        });
    }
}

export const getUserinfo = () => {
    return (dispatch) => {
        $.get(urls.GET_USERINFO_URL, (data)=> {
            dispatch({
                type: types.GET_USERINFO_SUCCESS,
                userinfo: data
            });
        }).error((e)=> {
            dispatch({
                type: types.GET_DATA_FAIL
            });
        });
    }
}

export const getEntry = (gamename) => {
    return (dispatch) => {
        $.get(urls.GET_ENTRY_URL + gamename, (data)=> {
            dispatch({
                type: types.GET_ENTRY_SUCCESS,
                entry: data
            });
        }).error((e)=> {
            dispatch({
                type: types.GET_DATA_FAIL
            });
        });
    }
}

export const getProvinces = () => {
    return (dispatch) => {
        $.get(urls.GET_PROVINCES, (data)=> {
            dispatch({
                type: types.GET_PROVINCES_SUCCESS,
                provinces: data
            });
        }).error((e)=> {
            dispatch({
                type: types.GET_DATA_FAIL
            });
        });
    }
}

export const getColleges = (provinceId) => {
    return (dispatch) => {
        $.get(urls.GET_COLLEGES + provinceId, (data) => {
            dispatch({
                type: types.GET_COLLEGES_SUCCESS,
                colleges: data
            });
        }).error((e)=> {
            dispatch({
                type: types.GET_DATA_FAIL
            });
        })
    }
}

export const getInstitutes = (collegeId) => {
    return (dispatch) => {
        $.get(urls.GET_INSTITUTES + collegeId, (data) => {
            dispatch({
                type: types.GET_INSTITUTES_SUCCESS,
                institutes: data
            });
        }).error((e)=> {
            dispatch({
                type: types.GET_DATA_FAIL
            });
        })
    }
}

export const getMessages = () => {
    return (dispatch) => {
        $.get(urls.GET_MESSAGES_URL, (data) => {
            dispatch({
                type: types.GET_MESSAGES_LIST_SUCCESS,
                messages: data
            });
        }).error((e)=> {
            dispatch({
                type: types.GET_DATA_FAIL
            });
        })
    }
}
