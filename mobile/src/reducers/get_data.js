import * as types from '../constant/types';

const data = (state = {}, action) => {
    switch (action.type) {
        case types.GET_GAME_ENTRYED_LIST_SUCCESS:
            return {
                games: action.games
            }
        case types.GET_TEAM_ENTRYED_LIST_SUCCESS:
            return {
                teams: action.teams
            }
        case types.GET_USERINFO_SUCCESS:
            return {
                userinfo: action.userinfo
            }
        case types.GET_ENTRY_SUCCESS:
            return {
                entry: action.entry
            }
        case types.GET_PROVINCES_SUCCESS:
            return {
                provinces: action.provinces,
                colleges: state.colleges,
                institutes: state.institutes,
            }
        case types.GET_COLLEGES_SUCCESS:
            return {
                provinces: state.provinces,
                colleges: action.colleges,
                institutes: state.institutes,
            }
        case types.GET_INSTITUTES_SUCCESS:
            return {
                provinces: state.provinces,
                colleges: state.colleges,
                institutes: action.institutes
            }
        case types.CLEAR_INSTITUTES:
            return {
                provinces: state.provinces,
                colleges: state.colleges,
                institutes: [],
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
