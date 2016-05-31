/**
 * Created by hard on 16-5-30.
 */
import { connect } from 'react-redux';
import IndividualEntry from '../components/IndividualEntry';
import { postLoginForm,postRegisterForm } from '../actions/submit_form'
import { setEntryStep } from '../actions/set_entry'

const mapStateToProps = (state) => {
    return {
        stepIndex: state.entry.stepIndex
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitLogin: (username,password,token)=>{
            dispatch(postLoginForm(username,password,token));
        },
        submitRegister: (username,email,password,rePassword)=>{
            dispatch(postRegisterForm(username,email,password,rePassword)); 
        },
        setEntryStep: (newStepIndex)=>dispatch(setEntryStep(newStepIndex))
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndividualEntry) 
