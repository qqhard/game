/**
 * Created by hard on 16-5-31.
 */
import React from 'react';
import {browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
const styles = {
    button: {
        width: '60%'
    }
};

class EntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forms: null 
        }
    }
    
    componentWillReceiveProps(newProps){
        if (!!newProps.game && !this.state.forms) {
            this.setState({forms: newProps.game.formList});
        }
    }
    
    componentDidMount(){
        if (!!this.props.game) {
            this.setState({forms: this.props.game.formList});
        }
    }

    handleForm(e,index){
        let forms = this.state.forms;
        forms[index].value = e.target.value;
        this.setState({forms:forms});
    }

    userDefineFormToStr() {
        var list = this.state.forms;
        var len = list.length;
        var new_lsit = [];
        for (var i = 0; i < len; i++) {
            new_lsit.push(list[i].name + "=" + list[i].value);
        }
        return new_lsit.join('#');
    }

    handleSubmit() {
        const { game,onSubmit } = this.props;
        const body = {
            gamename: game.gamename,
            phone: 'no',
            email: 'no',
            forms: this.userDefineFormToStr()
        }
        onSubmit(body); 
    }

    render() {
        const forms = ()=> {
            let ret = null;
            if (!!this.state.forms) {
                ret = this.state.forms.map((val, index)=> {
                    return (
                        <TextField
                            key={index}
                            floatingLabelText={val.name}
                            value={val.value}
                            fullWidth={true}
                            onChange={(e)=>this.handleForm(e,index)}
                        />
                    );
                });
            }
            return ret;
        }
        
        return (
            <div style={this.props.style}>
                {forms()}
                <div style={{textAlign:'center',marginTop:'20px'}}>
                    <RaisedButton
                        label="确认报名"
                        primary={true}
                        style={styles.button}
                        onClick={this.handleSubmit.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

export default EntryForm;
