// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import appReducer from './appReducer';
import liveTvReducer from './liveTvReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
    authReducer: authReducer,
    articleReducer: articleReducer,
    appReducer: appReducer,
    liveTvReducer
});

// Exports
export default rootReducer;