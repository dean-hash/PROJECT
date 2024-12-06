import { configureStore } from '@reduxjs/toolkit';
import affiliateNetworksReducer from './slices/affiliateNetworksSlice';
import userProfileReducer from './slices/userProfileSlice';

export const store = configureStore({
  reducer: {
    affiliateNetworks: affiliateNetworksReducer,
    userProfile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;