import React, { Component } from 'react';
import { Message, AddMessage } from './';

import List from 'material-ui/List';

class MessagesList extends Component {
    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView('smooth')
    }

    render() {
        const room = this.props.currentRoom ? this.props.currentRoom : 'general';
        let messages = this.props.messages.filter(message => message.room === room);
        return (
            <div>
                <div className="messages-list">
                    <List>
                        {messages.map(message => {
                            const hasUser = this.props.users[message.author] !== undefined;
                            const author = hasUser ? message.author : 'Unknown user';
                            return <Message key={message._id} author={author} content={message.content} date={message.date} />
                        })}
                    </List>
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
                <AddMessage />
            </div>
        )
    }
}

export default MessagesList;