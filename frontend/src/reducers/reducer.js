import {combineReducers} from 'redux'
import authreducer from './authreducer'
import  blogreducers from './blogreducer'

export default combineReducers({
    blogreducers,
    authreducer
})
