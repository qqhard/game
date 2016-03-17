import React from 'react';
import Steps from 'antd/lib/steps';
import 'antd/lib/index.css';
const Step = Steps.Step;

class GameSteps extends React.Component {
  constructor(props) {
      super(props);
  }
  getStatus(step){
    var process = this.props.game.step + 1;
    if(process == step)return 'process';
    if(process < step)return 'wait';
    if(process > step)return 'finish';
  }

  timeFormat(time)   {
    var now = new Date(time);
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return   year+"年"+month+"月"+date+"日  "+hour+":"+minute+":"+second;
  }
  render() {
    var submitTime = this.props.game.submitTime;
    var acceptTime = this.props.game.acceptTime;
    const steps = [{
      status: this.getStatus(1),
      title: '赛事提交',
      description: submitTime > 0 ? this.timeFormat(submitTime) : '赛事提交'
    }, {
      status: this.getStatus(2),
      title: '赛事审核',
      description: acceptTime > 0 ? this.timeFormat(acceptTime) : '赛事审核'
    }, {
      status: this.getStatus(3),
      title: '赛事报名',
      description: '赛事报名'
    }, {
      status: this.getStatus(4),
      title: '赛事开始',
      description: '赛事开始'
    },{
      status: this.getStatus(5),
      title: '赛事结束',
      description: '赛事结束'
    }].map(function(s, i) {
      return (
        <Step key={i} title={s.title} status={s.status} description={s.description} />
      );
    });
    console.log(this.props.game);
    return (
      <Steps direction="vertical">{steps}</Steps>
    )
  }
}

export default GameSteps;
