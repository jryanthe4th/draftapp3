const initialState = {

};

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case 'AUTHENTICATION_SIGNIN_SUCCESS':
    case 'AUTHENTICATION_SESSION_CHECK_SUCCESS': {
        const newState = Object.assign({}, state);
        newState.albums = action.json.albums;
        newState.artists = action.json.artists;
        return newState;
    }
    default: {
        return state;
    }
    }
}
