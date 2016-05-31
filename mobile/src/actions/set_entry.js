/**
 * Created by hard on 16-5-30.
 */
import * as types from '../constant/types';

export const setEntryStep = (newStepIndex) => {
    return {
        type: types.SET_ENTRY_STEP,
        stepIndex: newStepIndex
    }
}
