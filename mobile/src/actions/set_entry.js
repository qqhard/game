/**
 * Created by hard on 16-5-30.
 */
import * as types from '../constant/types';
import * as urls from '../constant/urls';
export const setEntryStep = (newStepIndex) => {
    return {
        type: types.SET_ENTRY_STEP,
        stepIndex: newStepIndex
    }
}

export const getEntryStep = (gamename) => {
    return (dispatch) => {
        $.get(urls.GET_ENTRY_URL+gamename, (data)=>{
            if(!!data){
                dispatch(setEntryStep(4));
            }else{
                dispatch(setEntryStep(2));
            }
        }).error((e)=>{
            dispatch(setEntryStep(0));
        });
    }
}
