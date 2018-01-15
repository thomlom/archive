import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Loader from '../Loader';
import Member from './Member';

import {loadMembers} from '../../actions/members';

class MembersList extends Component {
    async componentDidMount() {
        await this
            .props
            .loadMembers();
    }

    render() {
        if (this.props.members.length === 0) {
            return (
                <Loader/>
            );
        } else {
            console.log(this.props);
            return (
                <div className="main">
                    <div className="container members-list">
                        {this
                            .props
                            .members
                            .map((member, i) => <Member key={i} data={member}/>)}
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({members: state.members});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadMembers
}, dispatch);

MembersList = connect(mapStateToProps, mapDispatchToProps)(MembersList);

export default MembersList;