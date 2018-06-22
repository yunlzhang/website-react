const loginReducers = (state = {isLogin:false},action) => {
    switch(action.type){
        case 'LOGIN_IN':
            return { isLogin:true};

        case 'LOGIN_OUT':{
            return { isLogin:false};
        }
        default: 
            return state;
    }
}

export default loginReducers;