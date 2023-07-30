import { Provider }         from 'react-redux';
import { PersistGate }      from 'redux-persist/integration/react';
import store, { persistor } from '.';

const StoreProvider = (props) => {
  return (
    <Provider store={store}>
        <PersistGate loading={<div>loading...</div>} persistor={persistor}>
            {props.children}
        </PersistGate>
    </Provider>
  );
};

export default StoreProvider;