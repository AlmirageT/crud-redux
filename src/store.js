import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

//codigo para que si no tienes iunstalado redux devtools en el navegador el sistema no se caiga

const store = createStore(
    reducer,
    compose( applyMiddleware(thunk), 
        typeof window === 'object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
                window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;

