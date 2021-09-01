import { combineReducers, createStore } from 'redux';
import { appReducer } from './app-reducer';

const rootReducer = combineReducers({
	app: appReducer,
});

let store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
