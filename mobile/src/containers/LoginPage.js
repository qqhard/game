import { connect } from 'react-redux'
import { postLoginForm } from '../actions/submit_form'
import LoginPage from '../components/LoginPage'


const mapStateToProps = (state) => {
    return {
        message: state.message,
        status: state.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (username,password) => {
            dispatch(postLoginForm(username,password));
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage) 
