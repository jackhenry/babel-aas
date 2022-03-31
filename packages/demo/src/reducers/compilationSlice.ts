import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum CompilationStatus {
  Idle,
  Loading,
  Failed
}

export interface CompilationState {
  status: CompilationStatus;
}

const initialState: CompilationState = {
  status: CompilationStatus.Idle
}

export const compilationSlice = createSlice({
  name: 'compilation',
  initialState,
  reducers: {
    updateCompilationStatus: (state, action: PayloadAction<CompilationStatus>) => {
      state.status = action.payload;
    },
  }
});

export const { updateCompilationStatus } = compilationSlice.actions;

export const selectCompilationStatus = (state: RootState) => state.compilation;

export default compilationSlice.reducer;