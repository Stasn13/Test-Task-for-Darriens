import React, { Component } from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import { connect } from 'react-redux';
import UserTestTaskItem from 'components/testtask/UserTestTaskItem';
import Loader from "@material-ui/core/CircularProgress";


class Users extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_USERS' });
        this.props.dispatch({ type: 'GET_ALBUMS' });
        this.props.dispatch({ type: 'GET_PHOTOS' })
    }
    render() {
        let match = this.props.match;

        const {albums, users, } = this.props;

        if (albums.loading || albums.loadingPhotos || users.loading) 
            return <Loader />

        return (
            <div>
                <ContainerHeader title={<IntlMessages id="sidebar.testTask.users" />} match={match} />
                <div className="users-list-container">
                    {users.dataUsers.map(item => <UserTestTaskItem key={item.id} {...item}/>)}
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    albums: state.albums,
    users: state.users
}))(Users);;