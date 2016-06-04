/**
 * Created by hard on 16-6-1.
 */

import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { browserHistory } from 'react-router';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionSupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import Textmsm from 'material-ui/svg-icons/communication/textsms';
const styles = {
    tab: {
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        left: '0px'
    }
}


class Footer extends React.Component {
    render(){
        return (
            <Tabs
                style={styles.tab}
                initialSelectedIndex={this.props.index} 
                onChange={(val)=>{
                switch(val){
                    case 0:
                        browserHistory.push('/games.html');
                        break;
                    case 1:
                        browserHistory.push('/teams.html');
                        break;
                    case 2:
                        browserHistory.push('/messages.html');
                        break;
                    case 3:
                        browserHistory.push('/mine.html');
                        break;
                    default:
                        break;
                }                   
            }}
            >
                <Tab icon={<ActionGrade/>} value={0}/>
                <Tab icon={<ActionSupervisorAccount/>} value={1}/>
                <Tab icon={<Textmsm/>} value={2}/>
                <Tab icon={<ActionHome/>} value={3}/>
            </Tabs>
            
        )
    }
}

export default Footer;