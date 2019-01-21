const initialState = {
  username: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case 'USER_CLEAR_LIST':
  case 'USER_LOOKUP_FAILURE': {
    const newState = Object.assign({}, initialState);
    return newState;
  }
  case 'USER_LOOKUP_SUCCESS': {
    const newState = Object.assign({}, state);
    newState.username = action.json.username;
    return newState;
  }
  default: {
    return state;
  }
  }
}
