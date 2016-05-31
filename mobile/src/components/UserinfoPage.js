import React from 'react';
import {browserHistory} from 'react-router';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import UserinfoForm from './form/UserinfoForm';
import {title, form} from '../constant/styles';

class UserinfoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: '',
        }
    }

    componentDidMount() {
        const {getUserinfo} = this.props;
        getUserinfo();
    }

    componentWillReceiveProps(nextProps) {
        if (!!nextProps.message) {
            if (nextProps.message.status == true) {
                this.setState({open: true, message: '用户信息修改成功'});
                setTimeout(()=> {
                    this.setState({open: false});
                }, 1000);
            } else if(nextProps.message.status == false){
                this.setState({open: true, message: '用户信息修改失败'});
                setTimeout(()=> {
                    this.setState({open: false});
                }, 1000);
            }
        }
        if (!!nextProps.userinfo) {
            const {getProvinces, getColleges, getInstitutes} = this.props;
            getProvinces();
            if (nextProps.userinfo.provinceid > 0) getColleges(nextProps.userinfo.provinceid);
            if (nextProps.userinfo.collegeid > 0) getInstitutes(nextProps.userinfo.collegeid);
        }
    }

    render() {
        const {userinfo, provinces, colleges, institutes} = this.props;
        const {getProvinces, getColleges, getInstitutes,clearInstitutes } = this.props;
        return (
            <div>
                <AppBar
                    title="用户信息"
                    style={title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <UserinfoForm
                    style={form}
                    userinfo={userinfo}
                    provinces={provinces}
                    colleges={colleges}
                    institutes={institutes}
                    getProvinces={getProvinces}
                    getColleges={getColleges}
                    getInstitutes={getInstitutes}
                    clearInstitutes={clearInstitutes}
                    onSubmit={this.props.onSubmit}
                />
                <Dialog
                    modal={false}
                    open={this.state.open}
                >
                    {this.state.message}
                </Dialog>
            </div>
        )
    }
}

export default UserinfoPage;
