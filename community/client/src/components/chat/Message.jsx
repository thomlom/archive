import React from 'react';
import moment from 'moment';
import Emojify from 'react-emojione'

import { ListItem } from 'material-ui/List';

const Message = ({ author, date, content }) => (
    <div>
        <ListItem>
            <div>
                <span className="message-author">{author}</span>
                <span className="small pull-right">{moment(date).fromNow()}</span>
            </div>
            <Emojify style={{ marginTop: "5px" }}>
                <p className="message-content">{content}</p>
            </Emojify>
        </ListItem>
    </div>
)

export default Message;