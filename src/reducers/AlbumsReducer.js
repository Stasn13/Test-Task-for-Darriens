const reducer = (state = { dataAlbums: null, dataPhotos: null, loading: true, loadingPhotos: true}, action) => {
    switch (action.type) {
        case 'GET_ALBUMS':
            return {...state, loading: true}
        case 'ALBUMS_RECEIVED':
            return { ...state, 
                loading: false,
                dataAlbums: [...action.json]}

        case 'GET_PHOTOS':
            return { ...state, loadingPhotos: true}
        case 'PHOTOS_RECEIVED':
            return {
                ...state,
                loadingPhotos: false,
                dataPhotos: [ ...action.json] 
            }

        default:
            return state;
    }
};
export default reducer;