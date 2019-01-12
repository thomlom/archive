import React, { Component } from 'react';
import { Me, Account } from './'
import { Grid, Row, Col } from 'react-bootstrap';
import { deleteAccount } from '../../actions/profile';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Profile extends Component {
    render() {
        return (
            <Grid fluid>
                <h1 className="title">My account</h1>
                <Row>
                    <Col sm={12}>
                        <Me
                            username={this.props.user.username}
                        />
                        <Account id={this.props.user.id} deleteAccount={(id) => this.props.deleteAccount(id)} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({ user: state.auth.user });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteAccount
}, dispatch);

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;