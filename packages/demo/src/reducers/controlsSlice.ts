import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


export interface ControlsState {
  presets: string[],
  plugins: string[],
  example: string | null,
}

const initialState: ControlsState = {
  presets: [],
  plugins: [],
  example: null
}

export const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    clearParameters: (state) => {
      state.example = null;
      state.presets = [];
      state.plugins = [];
    },
    addPreset: (state, action: PayloadAction<string>) => {
      state.presets = [action.payload, ...state.presets]
    },
    removePreset: (state, action: PayloadAction<string>) => {
      state.presets = state.presets.filter(preset => preset !== action.payload)
    },
    addPlugin: (state, action: PayloadAction<string>) => {
      state.plugins = [action.payload, ...state.plugins]
    },
    removePlugin: (state, action: PayloadAction<string>) => {
      state.plugins = state.plugins.filter(plugin => plugin !== action.payload)
    },
    setExample: (state, action: PayloadAction<string | null>) => {
      state.example = action.payload;
    }
  },
});

export const { clearParameters, setExample, addPreset, removePreset, addPlugin, removePlugin } = controlsSlice.actions;

export const selectPresets = (state: RootState) => state.controls.presets;
export const selectPlugins = (state: RootState) => state.controls.plugins;
export const selectExample = (state: RootState) => state.controls.example;

export default controlsSlice.reducer;