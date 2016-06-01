import React from 'react';
import {browserHistory} from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import { timeFormat } from './common/time_format';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

const styles = {
    title: {
        position: 'fixed',
        top: '0px',
        left: '0px'
    },
    tab: {
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        left: '0px'
    },
    card: {
        marginTop: '70px'
    },
    cardMedia: {
        padding: '3px'
    }
}

class GameDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getData(this.props.params.gamename);
    }

    render() {
        if (!this.props.game)return <div></div>;
        const game = this.props.game;
        return (
            <div>
                <AppBar
                    title="赛事详情"
                    iconElementLeft={
                        <IconButton onClick={
                            ()=>browserHistory.push('/games.html')
                        }>
                            <HardwareKeyboardArrowLeft />
                        </IconButton>
                    }
                    style={styles.title}
                />
                <Card style={styles.card}>
                    <CardMedia style={styles.cardMedia}>
                        <img src={game.logoPath}/>
                    </CardMedia>
                    <CardHeader
                        title={game.gamename}
                        subtitle={game.gametitle}
                    />
                    <CardText style={{margin:0}}>
                        <h3>赛事简介：</h3>
                        <p>{game.briefinfo}</p>
                        <h3>赛事时间：</h3>
                        <p>{game.gametime}</p>
                        <h3>赛事地点：</h3>
                        <p>{game.gameplace}</p>
                        <h3>赛事开始：</h3>
                        <p>{timeFormat(game.startTime)}</p>
                        <h3>报名截止：</h3>
                        <p>{timeFormat(game.dueTime)}</p>
                        <h3>赛事结束：</h3>
                        <p>{timeFormat(game.endTime)}</p>
                    </CardText>
                    <CardActions>
                        <RaisedButton primary={true} label="报名" onClick={()=>browserHistory.push(`/individualentry-${game.gamename}.html`)}/>
                    </CardActions>
                </Card>
                <Card
                    actAsExpander={true}
                    onExpandChange={(newExpandState)=>{
                        console.log(newExpandState);
                        this.props.getGameDetail(this.props.params.gamename);
                    }
                }>
                    <CardHeader
                        title="详细信息"
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <div dangerouslySetInnerHTML={{__html: this.props.gameDetail}}></div>
                    </CardText>
                </Card>
            </div>

        )
    }
}

export default GameDetail;