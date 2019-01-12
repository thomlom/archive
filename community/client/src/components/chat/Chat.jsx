import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { MessagesList, Rooms } from './';
import { loadChatData } from '../../actions/chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Loader from '../Loader';

const roomDescription = {
    'general': 'Talk about everything you want here.',
    'bug': 'I hate bugs. So if you found one, let me know!',
    'feature': 'You have a brilliant idea? Share it with me.'
};

class Chat extends Component {
    async componentDidMount() {
        await this.props.loadChatData();
    }

    render() {
        const room = this.props.currentRoom ? this.props.currentRoom : 'general';
        if (!this.props.messages || !this.props.users) {
            return (
                <Loader />
            );
        } else {
            return (
                <Grid fluid className="app-container-chat">
                    <Row className="chat-header">
                        <Col sm={12} className="chat-header-primary">
                            <h1 className="title pull-left">Chat</h1>
                            <Rooms className="pull-right" />
                        </Col>
                        <Col sm={12}>
                            <p><em>{roomDescription[room]}</em></p>
                        </Col>
                    </Row>
                    <Row className="app-container-chat">
                        <Col sm={12} className="app-container-chat">
                            <MessagesList
                                messages={this.props.messages}
                                currentRoom={this.props.currentRoom}
                                users={this.props.users}
                            />
                        </Col>
                    </Row>
                </Grid >
            );
        }
    }
}

const mapStateToProps = (state) => ({
    messages: state.chat.messages,
    users: state.chat.users,
    currentRoom: state.chat.currentRoom
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadChatData
}, dispatch);

Chat = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default Chat;