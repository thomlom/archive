import React, { Component } from 'react';

import { red500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <FlatButton
                label="All things considered..."
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Just delete it!"
                labelStyle={{ color: 'red' }}
                onTouchTap={() => this.props.deleteAccount(this.props.id)}
            />,
        ];
        return (
            <div>
                <RaisedButton
                    label="Delete my account"
                    backgroundColor={red500}
                    labelColor={'white'}
                    onTouchTap={this.handleOpen} />
                <Dialog
                    title="Do you really want to delete your account?"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <ul>
                        <li>This is <strong>irreversible.</strong></li>
                        <li>You can come back whenever you want!</li>
                    </ul>
                </Dialog>
            </div>
        );
    }
}

export default Account;