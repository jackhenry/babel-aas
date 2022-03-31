import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultCode } from '../components/parameters/code';
import { RootState } from '../store';

export interface EditorState {
  inputText: string;
  exampleInputText: string;
  outputText: string;
}

const initialState: EditorState = {
  inputText: defaultCode,
  exampleInputText: "",
  outputText: "Press submit to see result."
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateExampleInputText: (state, action: PayloadAction<string>) => {
      state.exampleInputText = action.payload;
    },
    updateInputText: (state, action: PayloadAction<string>) => {
      state.inputText = action.payload;
    },
    updateOutputText: (state, action: PayloadAction<string>) => {
      state.outputText = action.payload;
    }
  }
});

export const { updateInputText, updateExampleInputText, updateOutputText } = editorSlice.actions;

export const selectInputText = (state: RootState) => state.editor.inputText;
export const selectOutputText = (state: RootState) => state.editor.outputText;
export const selectExampleInputText = (state: RootState) => state.editor.exampleInputText;

export default editorSlice.reducer;