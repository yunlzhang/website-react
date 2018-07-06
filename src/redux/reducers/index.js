import { combineReducers } from 'redux'

import loginReducers from './loginReducers';

import {msg} from './message';

export default combineReducers({
	loginInfo:loginReducers,
	msg
})