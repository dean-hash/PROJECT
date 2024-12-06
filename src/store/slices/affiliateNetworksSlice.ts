import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNetworkStatuses } from '../../services/affiliateNetworkService';
import { logger } from '../../utils/logger';

export const fetchNetworkStatuses = createAsyncThunk(
  'affiliateNetworks/fetchStatuses',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await getNetworkStatuses(email);
      return response;
    } catch (err) {
      logger.error(err as Error, { email });
      return rejectWithValue('Failed to fetch network statuses');
    }
  }
);

const affiliateNetworksSlice = createSlice({
  name: 'affiliateNetworks',
  initialState: {
    networks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNetworkStatuses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNetworkStatuses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.networks = action.payload;
      })
      .addCase(fetchNetworkStatuses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default affiliateNetworksSlice.reducer;