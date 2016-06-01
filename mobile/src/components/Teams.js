import React from 'react';
import { browserHistory } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Footer from './tab/Footer';

const styles = {
    title : {
        position:'fixed',
        top:'0px',
        left:'0px'
    },
    tab : {
        position:'fixed',
        bottom:'0px',
        width:'100%',
        left:'0px'
    },
    list : {
        paddingBottom:'50px',
        paddingTop:'70px'
    },
    card : {
        marginBottom: '10px' 
    },
    cardMedia: {
        padding: '3px'
    }
}

class TeamNode extends React.Component {
    
    render() {
        const team = this.props.team;
        return (
            <div>
                <Card style={styles.card}>
                    <CardTitle title={team.enname} subtitle={team.cnname}/>
                    <CardText>
                        <h3>队伍简介</h3>
                        <p>{team.info}</p>
                    </CardText>
                    <CardActions>
                        <RaisedButton primary={true} label="详情" onClick={()=>browserHistory.push('/')}/>
                        <RaisedButton secondary={true} label="加入" onClick={()=>browserHistory.push('/')}/>
                    </CardActions>
                </Card>

            </div>
        )

    }
}

class Teams extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getData();
    }
    render() {
        let teams = null;
        if(!!this.props.teams){
            teams = this.props.teams.map((val,index)=>{
                return <TeamNode key={index} team={val}/>;
            });
        }
        return (
            <div>
                <AppBar
                    title="赛事列表"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    style={styles.title}
                />
                <div style={styles.list}>
                    {teams}
                </div>
                <Footer index={1}/>
            </div>
        )
    }
}

export default Teams;