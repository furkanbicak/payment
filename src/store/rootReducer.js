import { combineReducers }  from 'redux';
import { persistReducer }   from 'redux-persist';
import userReducer          from './slices/userSlice';
import packagesReducer      from './slices/packagesSlice';
import paymentReducer       from './slices/paymentSlice';
import storage              from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const persistReducers = combineReducers({
    user: userReducer,
    packages: packagesReducer,
    payment: paymentReducer
});

const persistedReducer = persistReducer(persistConfig, persistReducers);

export default persistedReducer;