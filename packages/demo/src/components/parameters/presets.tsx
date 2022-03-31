import { FunctionalComponent, h } from "preact";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addPreset, removePreset, selectPresets } from "../../reducers/controlsSlice";
import CheckboxGroup from "../common/checkbox-group";

type ChoiceMap = {
  [choiceName: string]: string
}

type PresetChoice = keyof ChoiceMap;

const choiceMap: ChoiceMap = {
  'env': '@babel/preset-env',
  'react': '@babel/preset-react',
  'flow': '@babel/preset-flow',
  'typescript': '@babel/preset-typescript',
}

const reverseMap: ChoiceMap = {}
Object.keys(choiceMap).forEach(key => {
  const fullName = choiceMap[key];
  reverseMap[fullName] = key;
});

const Presets: FunctionalComponent = () => {

  const choices = Object.keys(choiceMap);
  const dispatch = useAppDispatch();

  const addBabelPreset = (presetName: PresetChoice) => {
    dispatch(addPreset(choiceMap[presetName]));
  }

  const removeBabelPreset = (presetName: PresetChoice) => {
    dispatch(removePreset(choiceMap[presetName]));
  }

  return (
    <div class="flex flex-col">
      <span class="self-center mb-1">Presets</span>
      <CheckboxGroup choices={choices} onCheck={addBabelPreset} onUncheck={removeBabelPreset} />
    </div>
  )
}

export default Presets;