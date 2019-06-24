import React, { Component } from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from "@material-ui/core/CircularProgress";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AlbumsTestTaskItem from "components/testtask/AlbumsTestTaskItem"; 

class Photos extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_PHOTOS' });
        this.props.dispatch({ type: 'GET_ALBUMS' });
        this.props.dispatch({ type: 'GET_USERS' })
    }

     formatAlbums(){
        const { albums: {dataPhotos, dataAlbums},
                users: {dataUsers} } = this.props;

        return dataAlbums.map(album => {
            album.user = dataUsers.find(user => user.id === album.userId);
            album.photos = dataPhotos.filter(photo => photo.albumId === album.id);
            return album;
        });
    }

    render(){
        let match = this.props.match;
        const {albums, users} = this.props;
        console.log(match.params.id);
        /* console.log(albums); */
        console.log(users)
        let styles ={
            marginBottom: 4,
            display: "inline-block",
            marginLeft: 4,
            fontSize: 20
        }
        let stylesAlbum = {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        }

        if (albums.loading || albums.loadingPhotos || users.loading) 
            return <Loader />

        const formatAlbums = this.formatAlbums();
        
        return(
            <div className="">
                <ContainerHeader title={<IntlMessages id="sidebar.testTask.albums" />}  match={match}/>
                <Link to=".././users" style={styles}>Back to users-list</Link>

                <div className="albums-container" style={stylesAlbum}>{
                    formatAlbums.filter(album => album.userId == match.params.id)
                        .map(album => <AlbumsTestTaskItem key={album.id} 
                            {...album} />)}
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    albums: state.albums,
    users: state.users
})) (Photos)
