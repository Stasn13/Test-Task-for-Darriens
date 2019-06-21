export const getAlbums = () => ({
    type: 'GET_ALBUMS',
});
export const receiveAlbums = () => {

    return {
        json: {}, 
        type: "ALBUMS_RECEIVED"
    }
}

export const getPhotos = () => ({
    type: "GET_PHOTOS",
});
export const receivePhotos = () => {

    return {
        json: {},
        type: "PHOTOS_RECEIVED"
    }
}
