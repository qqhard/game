/**
 * Created by hard on 16-5-30.
 */
import { connect } from 'react-redux';
import IndividualEntry from '../components/IndividualEntry';
import { postLoginForm,postRegisterForm,putUserinfoForm,postEntryForm } from '../actions/submit_form'
import { getUserinfo, getProvinces, getColleges, getInstitutes,getGame,getEntry } from '../actions/get_data';
import { setEntryStep,getEntryStep } from '../actions/set_entry'

const mapStateToProps = (state) => {
    return {
        message: state.message,
        stepIndex: state.entry.stepIndex,
        userinfo: state.data.userinfo,
        entry: state.data.entry,
        provinces: state.data.provinces,
        colleges: state.data.colleges,
        institutes: state.data.institutes,
        game: state.game.game,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitLogin: (username,password,callBack)=>{
            dispatch(postLoginForm(username,password,callBack));
        },
        submitRegister: (username,email,password,rePassword,callBack)=>{
            dispatch(postRegisterForm(username,email,password,rePassword,callBack)); 
        },
        submitUserinfo: (studentid,sociolname,phone,email,provinceid,collegeid,instituteid,callBack) => {
            dispatch(putUserinfoForm(studentid,sociolname,phone,email,provinceid,collegeid,instituteid,callBack));
        },
        submitEntry: (body,callBack) => {
            dispatch(postEntryForm(body,callBack));
        },
        setEntryStep: (newStepIndex)=>dispatch(setEntryStep(newStepIndex)),
        getUserinfo: ()=>dispatch(getUserinfo()),
        getProvinces: ()=>dispatch(getProvinces()),
        getColleges: (provinceid)=>dispatch(getColleges(provinceid)),
        getInstitutes: (collegeid)=>dispatch(getInstitutes(collegeid)),
        getGame: (gamename)=>dispatch(getGame(gamename)),
        getEntryStep: (gamename)=>dispatch(getEntryStep(gamename)),
        getEntry: (gamename)=>dispatch(getEntry(gamename)),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndividualEntry) 
