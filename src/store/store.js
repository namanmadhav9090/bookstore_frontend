import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import utilSlice from "./slices/utilSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
 

// Define slices
const userReducer = userSlice;
const utilsReducer = utilSlice; 



// Combine reducers
const rootReducer = combineReducers({
    userData: userReducer,
    utils: utilsReducer
});

const persistConfig = {
  key: "root", 
  storage,
  whitelist:['userData']
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);


export { store, persistor };
