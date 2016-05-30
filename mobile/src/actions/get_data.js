import * as types from '../constant';
import * as urls from '../urls';

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

export const getGame = (gamename) => {
    return (dispatch)=> {
        $.get(`${urls.GET_GAME_URL}${gamename}`, (data)=> {
            dispatch({
                type: types.GET_GAME_SUCCESS,
                game: data
            });
        }).error((e)=> {
            type: types.GET_DATA_FAIL
        });
    }
}

export const getGameDetail = (gamename) =>  {
    return (dispatch) => {
        $.get(`${urls.GET_GAME_DETAIL_URL}${gamename}`, (data)=>{
            console.log(data);
            dispatch({
                type: types.GET_GAME_DETAIL_SUCCESS,
                gameDetail: data.text
            });
        }).error((e)=>{
            type: types.GET_DATA_FAIL 
        });
    }
}