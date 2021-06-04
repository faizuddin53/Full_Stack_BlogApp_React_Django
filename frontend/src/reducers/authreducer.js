import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    USER_LOGIN,
    AUTHENTICATED_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {

    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    id: localStorage.getItem('id'),
    username: localStorage.getItem('username'),
    isAuthenticated: null,
    user: null,
};

export default function authreducer (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
    
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('id');
            localStorage.removeItem('username');  

            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                username: null,
                id: null,
            }
            // case "AUTH_SUCCESS":{
            //     console.log(action.payload)
            //    localStorage.setItem("username", action.payload.username)
            //     // localStorage.setItem("password", action.payload.password)
            //     console.log(action.payload)
            //     return action.payload
            // }
    
            // case "LOGOUT":{
            //     localStorage.clear()
            //     // console.log("localstorage cleared, {username:null, password:null}")
            //     return {username:null, password:null}
            // }
    
            // case "PAGE_LOADED":{
            //     const onLoad = {username:null, password:null}
            //     onLoad.username = localStorage.getItem('username')? localStorage.getItem('username'):null
            //     // onLoad.password = localStorage.getItem('password')? localStorage.getItem('password'):null
            //     return onLoad
            // }
            // case "SAVE_TOKEN":{
            //     localStorage.setItem('access', action.payload.access)
            //     localStorage.setItem('refresh', action.payload.refresh)
            //     return action.payload
            // }
    
            // case "REFRESH_TOKEN":{
            //     console.log(action.payload)
            //     localStorage.setItem('access', action.payload.access)
            //     return {...state, access:action.payload.access}
            // }
    
            // case "CLEAR_TOKEN":{
            //     return ""
            // }
            case USER_LOGIN:
                localStorage.setItem("id", payload.id)
                localStorage.setItem("username", payload.username)   
                return {
                    ...state,
                isAuthenticated: true,
                id: payload.id,
                username: payload.username
            }
            

        
        default:
            return state
    }
};
