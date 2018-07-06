import {customFetch} from '../../assets/js/common';

import types from '../constant';


let createAction = (type, payload) => {
    return {
        type,
        payload
    };
};

let fetchUserInfo = () => (dispatch) => {
    customFetch({
        url:window.requestHost + '/get_userinfo',
        method:'GET',
    })
    .then(res => {
        if(res.code === 200){
            dispatch(createAction(types.LOGIN_IN,res.data))
        }else{
            dispatch(createAction(types.LOGIN_IN))
        }
    })
}

let loginIn = (data) => dispatch => {
    dispatch({
        type:types.LOGIN_IN,
        data
    })
}


let loginOut = (data) => dispatch => {
    dispatch({
        type:types.LOGIN_OUT,
        data
    })
}

export {
    fetchUserInfo,
    loginIn,
    loginOut
}


