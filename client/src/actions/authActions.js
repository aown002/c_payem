import { authConstants } from '../constants/authConstants'
import { alertActions } from './alertActions'
import { authServices } from '../services'

const login = (username, password) => async (dispatch) => {
    const request = (user) => ({ type: authConstants.LOGIN_REQUEST, user });
    const success = (user) => ({ type: authConstants.LOGIN_SUCCESS, user });
    const failure = (err) => ({ type: authConstants.LOGIN_FAILURE, err });

    dispatch(request({ username }));

    try {
        let user = await authServices.login(username, password);
        dispatch(success(user));
        console.log(user)
        try {
            
            dispatch(alertActions.success("Login Successful"));
            //window.location.href = `${user.redirectURL}`;
        }
        catch (err) {
            dispatch(failure(err));
            dispatch(alertActions.error(err));
          
        }
    }
    catch (err) {
        dispatch(failure(err));
        dispatch(alertActions.error(err));
    }
}

const logout = () => dispatch => {
    authServices.logout();
    dispatch({
        type: authConstants.LOGOUT,
    });
   // window.location.href = `/signin`
}

const verifyUser = (user) => async (dispatch) => {
    return new Promise(async (reject, resolve) => {
        const request = (user) => ({ type: authConstants.VERIFY_REQUEST, user });
        const success = (user) => ({ type: authConstants.VERIFY_SUCCESS, user });
        const failure = (err) => ({ type: authConstants.VERIFY_FAILURE, err });

        await dispatch(request({ user }));

        try {
            let response = await authServices.verifyUser(user);
            dispatch(success(user));

            dispatch(alertActions.success("User Verified"));
            resolve()
            // window.location.href = `${user.redirectURL}`;
        }
        catch (err) {
            dispatch(failure(err));
            dispatch(alertActions.error(err));
           
            reject()
            //window.location.href = `${err.response.data.redirectURL}`;
            //window.location.href = "/signin";
        }
    })
}

export const authActions = {
    login,
    logout,
    verifyUser,
};