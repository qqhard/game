import { connect } from 'react-redux'
import { postRegisterForm } from '../actions/submit_form'
import RegisterPage from '../components/RegisterPage'


const mapStateToProps = (state) => {
    return {
        message: state.message,
        status: state.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (username,email,password,rePassword) => {
            dispatch(postRegisterForm(username,email,password,rePassword));
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterPage) 
