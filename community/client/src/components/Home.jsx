import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from './layout';
import { Grid, Col, Row } from 'react-bootstrap';

import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import {
  orange200,
  pink400
} from 'material-ui/styles/colors';

class Home extends Component {
  render() {
    const message = this.props.location.state;
    return (
      <div>
        <Grid fluid>
          {message && <p className="title text-center">{message.message}</p>}
          <Row>
            <Col sm={10} smOffset={1}>
              <div>
                <h2 className="title">
                  <Avatar
                    color={orange200}
                    backgroundColor={pink400}
                    icon={<FontIcon className="material-icons">home</FontIcon>} />
                  <span style={{ marginLeft: "5px" }}>Welcome</span>
                </h2>
              </div>
              <div>
                <Row>
                  <Col sm={12}>
                    <h4 className="title">Presentation</h4>
                    <List>
                      <ListItem>
                        You can <Link to="/chat"><strong className="emphasis-word">chat</strong></Link> with others.
                      </ListItem>
                      <ListItem>
                        You can participate to <Link to="/polls"><strong className="emphasis-word">polls</strong></Link> and create ones.
                      </ListItem>
                    </List>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row >
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default Home;
