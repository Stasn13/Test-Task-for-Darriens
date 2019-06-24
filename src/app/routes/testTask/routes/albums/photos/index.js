import React, { Component } from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from "@material-ui/core/CircularProgress";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

class Photos extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'GET_PHOTOS' });
        this.props.dispatch({ type: 'GET_ALBUMS' });
    }
    render(){
        let match = this.props.match;
        const {albums} = this.props;
        console.log(match.params.id);
        console.log(albums);
        let styles ={
            marginBottom: 4,
            display: "inline-block",
            marginLeft: 4,
            fontSize: 20
        }

        if (albums.loading || albums.loadingPhotos) 
            return <Loader />
        
        return(
            <div className="">
                <ContainerHeader title={<IntlMessages id="sidebar.testTask.photos" />}  match={match}/>
                <Link to=".././albums" style={styles}>Back to albums</Link>
                {console.log(albums.dataPhotos.filter(photo => photo.albumId == match.params.id))}
                <div className="gl-image">
                  <GridList cellHeight={160} className="gl" cols={3}>
                    {albums.dataPhotos.filter(photo => photo.albumId == match.params.id).map((photo, index) =>
                      <GridListTile key={index} cols={1}>
                        <img src={photo.url} alt={photo.title}/>
                      </GridListTile>
                    )}
                  </GridList>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    albums: state.albums,
})) (Photos)
