import React from 'react';
import GameList from './components/game_list/game_list.js';
import { browserHistory } from 'react-router';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';

const thumbnailInstance = (
  <Grid>
    <Row>
    <Col xs={6} md={4}>
      <Thumbnail src="http://img3.91.com/uploads/allimg/141110/703-141110105223.jpg" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail src="http://img3.91.com/uploads/allimg/141110/703-141110105223.jpg" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail src="http://img3.91.com/uploads/allimg/141110/703-141110105223.jpg" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    </Row>
  </Grid>
);

class Games extends React.Component {
  constructor(props) {
      super(props);
  }
  render() {
      return (
        <div>
        {thumbnailInstance}
        </div>
      );
    }
}



export default Games;
