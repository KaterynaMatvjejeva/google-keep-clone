export const initialState = {
  userAuthorized: false
};

export const APP_ACTIONS = {
  USER_AUTHORIZED: 'USER_AUTHORIZED',
  USER_LOGED_OUT: 'USER_LOGED_OUT'
};

const appReducer = (prevState, action) => {
  switch (action.type) {
    case APP_ACTIONS.USER_AUTHORIZED:
      return {
        ...prevState,
        ...action.payload,
        userAuthorized: true,
      };
    case APP_ACTIONS.USER_LOGED_OUT:
      return {
        ...initialState,
      }
    default:
      return prevState;
  }
};

export default appReducer;
