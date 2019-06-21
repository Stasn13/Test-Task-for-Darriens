import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchAlbums() {
    const json = yield fetch('https://jsonplaceholder.typicode.com/albums')
            .then(response => response.json());
    yield put({ type: "ALBUMS_RECEIVED", json: json, });
}
function* fetchPhotos() {
    const json = yield fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json());
    yield put({ type: "PHOTOS_RECEIVED", json: json, });
}
function* actionWatcherAlbum() {
    yield takeLatest('GET_ALBUMS', fetchAlbums)
}
function* actionWatcherPhoto() {
    yield takeLatest('GET_PHOTOS', fetchPhotos)
}
export default function* rootSaga() {
    yield all([
        actionWatcherAlbum(),
        actionWatcherPhoto()
    ]);
}

