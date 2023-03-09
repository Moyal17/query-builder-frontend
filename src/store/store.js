import {
  createStore, combineReducers, applyMiddleware, compose
} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import queryReducer from './reducers/queryReducer';

const rootReducer = combineReducers({
  userR: userReducer,
  queryR: queryReducer
});

const logger = store => next => (action) => {
  // console.log('[Middleware] dispatching', action);
  const result = next(action);
  // console.log('[Middleware] next state', store.getState());
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

export default store;
