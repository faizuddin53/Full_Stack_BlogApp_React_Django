import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOGIN,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT
} from './types';

export const load_user = () => async dispatch => {
    if (localStorage.getItem('refesh')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('refresh')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/refresh/`, config);
             console.log("load user",res.data)
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
                
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};


export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({ token: localStorage.getItem('access')});

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/verify/`, body, config)
             console.log("authanticated",res.data)
            if (res.data.code !=="token_not_valid") {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};


// export const login = (username, password) => {
    
//     return dispatch => {
        
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         };
    
//         const body = JSON.stringify({ username, password });

//         axios.post(`${process.env.REACT_APP_API_URL}/token/`,body, config)
//         .then(response => {
//             console.log(response.data)
//             dispatch({
//                   type:LOGIN_SUCCESS,
//                   payload: response.data 
                  
//             })
//             // dispatch(load_user());
//             // dispatch(load_user());
//             axios.get(`${process.env.REACT_APP_API_URL}/users/${username}/`)
//             .then(resp => {
//                 console.log("here is userdetails",resp.data);
//                 dispatch({
//                     type: USER_LOGIN,
//                     payload: resp.data
//                 });
//             })
//             dispatch(load_user());
          
//         }).catch(err => {
//              dispatch({
//                     type:LOGIN_FAIL,                  
//                 })     
//         })
     
//     };
// };
export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/token/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });  
      const resp = await axios.get(`${process.env.REACT_APP_API_URL}/users/${username}/`)
               dispatch({
                type: USER_LOGIN,
                payload: resp.data
                   });

    dispatch(load_user());           
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
};


export const signup = (first_name, last_name, username, email,password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, username, email,password, re_password });
    console.log(body);

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/register/`, body, config);
          console.log('hello redux this is me', res.data)

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });


    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};



export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};
