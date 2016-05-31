import React from 'react';
import { browserHistory } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import AppBar from 'material-ui/AppBar';
import ActionSupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';

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

class GameNode extends React.Component {
    
    render() {
        const game = this.props.game;
        return (
            <div>
                <Card style={styles.card}>
                    <CardMedia style={styles.cardMedia}>
                        <img src={game.logoPath}/>
                    </CardMedia>
                    <CardTitle title={game.gamename} subtitle={game.gametitle}/>
                    <CardText>
                        {game.briefinfo}
                    </CardText>
                    <CardActions>
                        <RaisedButton primary={true} label="详情" onClick={()=>browserHistory.push(`/gamedetail-${game.gamename}.html`)}/>
                        <RaisedButton secondary={true} label="报名" onClick={()=>browserHistory.push(`/individualentry-${game.gamename}.html`)}/>
                    </CardActions>
                </Card>

            </div>
        )

    }
}

class Games extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getData();
    }
    render() {
        let games = null;
        if(!!this.props.games){
            games = this.props.games.map((val,index)=>{
                return <GameNode key={index} game={val}/>;
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
                    {games}
                </div>
                <Tabs style={styles.tab}>
                    <Tab icon={<ActionGrade/>} value={0}/>
                    <Tab icon={<ActionSupervisorAccount/>} value={1}/>
                    <Tab icon={<ActionHome/>} value={2}/>
                </Tabs>
            </div>
        )
    }
}

export default Games;