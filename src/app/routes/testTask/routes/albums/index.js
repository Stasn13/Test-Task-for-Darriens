import React,{Component} from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import {connect} from 'react-redux';
import Loader from "@material-ui/core/CircularProgress";
import AlbumsTestTaskItem from "components/testtask/AlbumsTestTaskItem"; 
import TextField from "@material-ui/core/TextField"

class Albums extends Component{

    state = {
        searchText: ""
    }
    componentDidMount(){
        this.props.dispatch({ type: 'GET_ALBUMS'})
        this.props.dispatch({ type: 'GET_PHOTOS'})
        this.props.dispatch({ type: 'GET_USERS' })
    }
    handleSearch(e){
        this.setState({
            searchText: e.target.value
        })
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

        let styles = {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        }
        let { loadingPhotos, loading} = albums;
        if (loading || loadingPhotos || users.loading)
            return <Loader/>

        let regExp = new RegExp(this.state.searchText);
        const formatAlbums = this.formatAlbums();
        return (
            <div>
                <ContainerHeader title={<IntlMessages id="sidebar.testTask.albums" />} match={match} />
                <TextField label="Search title"
                           value={this.state.searchText}
                           onChange={this.handleSearch.bind(this)}/>
 
                <div className="albums-container" style={styles}>{
                    formatAlbums
                        .filter(album => album.title.match(regExp))
                        .map(album => <AlbumsTestTaskItem key={album.id} 
                            {...album} />)
                }</div>
            </div>
        )
    }
}

export default connect(state => ({
    albums: state.albums,
    users: state.users
}))(Albums);