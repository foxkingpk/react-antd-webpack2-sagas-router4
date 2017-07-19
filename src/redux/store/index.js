import reducers from '../reducers';
import saga from '../sagas';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
const sagaMiddleware = createSagaMiddleware();
let store;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    store = createStore(reducers, compose(applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
} else {
    store = createStore(reducers, applyMiddleware(sagaMiddleware));
}
sagaMiddleware.run(saga);

export default store;
