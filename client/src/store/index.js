import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from '../reducer/index';
import thunk from "redux-thunk";


const store = createStore(
    rootReducer, // acá recibimos la función reductora (reducer)
    composeWithDevTools(applyMiddleware(thunk)),
)

export default store;