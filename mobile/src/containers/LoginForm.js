import { connect } from 'react-redux'
import { postLoginForm } from '../actions/submit_form'
import LoginForm from '../components/LoginForm'


const mapStateToProps = (state) => {
    return {
        message: state.message,
        status: state.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (username,password,token) => {
            dispatch(postLoginForm(username,password,token));
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm) 
