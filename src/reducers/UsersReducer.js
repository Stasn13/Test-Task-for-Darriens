const reducer = (state = { dataUsers: null, loadingUsers: true}, action) => {
    const json = action.json && Object.keys(action.json).map(key => action.json[key])
    switch (action.type) {
        case 'GET_USERS':
            return {...state, loading: true}
        case 'USERS_RECEIVED':
            return { ...state, 
                loading: false,
                dataUsers: [...json]}

        default:
            return state;
    }
};
export default reducer;