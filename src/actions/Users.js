export const getUsers = () => ({
    type: 'GET_USERS',
});
export const receiveUsers = () => {

    return {
        json: {},
        type: "USERS_RECEIVED"
    }
}