import { FunctionalComponent, h } from "preact";
import { useAppDispatch } from "../../hooks";
import { addPlugin, removePlugin } from "../../reducers/controlsSlice";
import CheckboxGroup from "../common/checkbox-group";

type ChoiceMap = {
  [choiceName: string]: string
}

type PluginChoice = keyof ChoiceMap;

const Plugins: FunctionalComponent = () => {

  const choiceMap: ChoiceMap = {
    'fast-async': 'module:fast-async',
    'idx': 'babel-plugin-idx',
    'console-source': 'babel-plugin-console-source',
    'export-default-from': '@babel/plugin-proposal-export-default-from',
    'function-bind': '@babel/plugin-proposal-function-bind',
    'function-sent': '@babel/plugin-proposal-function-sent',
    'throw-expressions': '@babel/plugin-proposal-throw-expressions',
  }

  const choices = Object.keys(choiceMap);

  const dispatch = useAppDispatch();

  const addBabelPlugin = (presetName: PluginChoice) => {
    dispatch(addPlugin(choiceMap[presetName]));
  }

  const removeBabelPlugin = (presetName: PluginChoice) => {
    dispatch(removePlugin(choiceMap[presetName]));
  }

  return (
    <div class="flex flex-col">
      <span class="self-center mb-1">Plugins</span>
      <CheckboxGroup choices={choices} onCheck={addBabelPlugin} onUncheck={removeBabelPlugin} />
    </div>
  )
}

export default Plugins;