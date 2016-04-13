import React from 'react';
import Steps from 'antd/lib/steps';
import {timeFormat} from '../common/time_format.js';

const Step = Steps.Step;

class GameSteps extends React.Component {
    constructor(props) {
        super(props);
    }

    getStatus() {
        if(this.props.game.step == 0){
            return ['process','wait','wait','wait','wait'];
        }else if(this.props.game.step == 1){
            return ['finish','process','wait','wait','wait'];
        }else if(this.props.game.step == 2){
            const nowTime = Date.parse(new Date());
            if(this.props.game.startTime == 0 || this.props.game.dueTime == 0 || this.props.game.endTime == 0){
                return ['finish','finish','wait','wait','wait'];
            }
            if(nowTime < this.props.game.startTime){
                return ['finish','finish','wait','wait','wait'];
            }else if(nowTime < this.props.game.dueTime){
                return ['finish','finish','process','wait','wait'];
            }else if(nowTime < this.props.game.endTime){
                return ['finish','finish','finish','finish','wait'];
            }else if(nowTime > this.props.game.endTime){
                return ['finish','finish','finish','finish','finish'];
            }
        }
    }

    render() {
        const submitTime = this.props.game.submitTime;
        const acceptTime = this.props.game.acceptTime;
        const startTime = this.props.game.startTime;
        const dueTime = this.props.game.dueTime;
        const endTime = this.props.game.endTime;
        const nowTime = Date.parse(new Date());
        const status = this.getStatus();
        const steps = [{
            status: status[0],
            title: '赛事提交',
            description: submitTime > 0 ? timeFormat(submitTime) : '赛事提交'
        }, {
            status: status[1],
            title: '赛事审核',
            description: acceptTime > 0 ? timeFormat(acceptTime) : '赛事审核'
        }, {
            status: status[2],
            title: '报名开始',
            description: startTime > 0 ? timeFormat(startTime) : '报名开始'
        }, {
            status: status[3],
            title: '报名截止',
            description: dueTime > 0 ? timeFormat(dueTime) : '报名截止'
        }, {
            status: status[4],
            title: '赛事结束',
            description: endTime > 0 ? timeFormat(endTime) : '赛事结束'
        }].map(function (s, i) {
            return (
                <Step key={i} title={s.title} status={s.status} description={s.description}/>
            );
        });
        console.log('step render');
        return (
            <Steps direction="vertical">{steps}</Steps>
        )
    }
}

export default GameSteps;
