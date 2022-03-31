import { FunctionalComponent, h } from "preact";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addPlugin, addPreset, clearParameters, selectExample, setExample } from "../../reducers/controlsSlice";
import { updateExampleInputText, updateInputText } from "../../reducers/editorSlice";
import CheckboxGroup from "../common/checkbox-group";
import { defaultCode, jsxCode } from "./code";

type ExampleSettings = {
  code: string;
  presets: string[],
  plugins: string[],
}

type ChoiceMap = {
  [choiceName: string]: ExampleSettings;
}

type Example = keyof ChoiceMap;

const exampleChoices: ChoiceMap = {
  jsx: {
    code: jsxCode,
    presets: ['@babel/preset-react'],
    plugins: []
  },
  es6: {
    code: defaultCode,
    presets: [],
    plugins: [],
  }
}

const Examples: FunctionalComponent = () => {

  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectExample);

  const handleCheck = (exampleName: Example) => {
    const { code, presets, plugins } = exampleChoices[exampleName];
    dispatch(updateExampleInputText(code));
    dispatch(updateInputText(code));
    dispatch(setExample(exampleName + ""));
    presets.forEach(preset => dispatch(addPreset(preset)));
    plugins.forEach(plugin => dispatch(addPlugin(plugin)));
  }

  const handleUncheck = (exampleName: Example) => {
    dispatch(setExample(null));
  }

  const choices = Object.keys(exampleChoices);

  return (
    <div class="flex flex-col">
      <span class="self-center mb-1">Examples</span>
      <CheckboxGroup choices={choices} onCheck={handleCheck} onUncheck={handleUncheck} />
    </div>
  )
}

export default Examples;
