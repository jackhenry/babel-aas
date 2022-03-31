import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


export interface UiState {
  showDrawer: boolean
}

const initialState: UiState = {
  showDrawer: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<boolean>) => {
      state.showDrawer = action.payload;
    },
  },
});

export const { toggle } = uiSlice.actions;

export const selectShowDrawer = (state: RootState) => state.ui.showDrawer;

export default uiSlice.reducer