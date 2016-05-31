import {connect} from 'react-redux'
import { putUserinfoForm } from '../actions/submit_form'
import UserinfoPage from '../components/UserinfoPage'
import {getUserinfo, getProvinces, getColleges, getInstitutes} from '../actions/get_data';
import {clearProvinces, clearColleges, clearInstitutes} from '../actions/set_data';

const mapStateToProps = (state) => {
    return {
        message: state.message,
        userinfo: state.data.userinfo,
        provinces: state.data.provinces,
        colleges: state.data.colleges,
        institutes: state.data.institutes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (studentid,sociolname,phone,email,provinceid,collegeid,instituteid) => {
            dispatch(putUserinfoForm(studentid,sociolname,phone,email,provinceid,collegeid,instituteid));
        },
        getUserinfo: ()=>dispatch(getUserinfo()),
        getProvinces: ()=>dispatch(getProvinces()),
        getColleges: (provinceId)=>dispatch(getColleges(provinceId)),
        getInstitutes: (collegeId)=>dispatch(getInstitutes(collegeId)),
        clearInstitutes: ()=>dispatch(clearInstitutes()),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserinfoPage) 
