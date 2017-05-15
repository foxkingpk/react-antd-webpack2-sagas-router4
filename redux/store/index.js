import reducers from 'REDUX/reducers';
import saga from 'REDUX/sagas';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';

const sagaMiddleware = createSagaMiddleware();
// const store = createStore(reducers, compose(applyMiddleware(sagaMiddleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

export default store;
